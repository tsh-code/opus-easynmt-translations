from easynmt import EasyNMT
import json
import os

def main(event, context):
    source_lang = os.environ.get("FROM_LANGUAGE_CODE")
    target_lang = os.environ.get("TO_LANGUAGE_CODE")
    
    try:
        body_dict = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError as e:
        print(f"Error parsing body JSON: {e}")
        return

    source_text = body_dict.get("text")

    if source_text is None:
        print("Error: 'text' not found in body.")
        return

    nmt = EasyNMT("opus-mt")

    print(f"Translating from {source_lang} to {target_lang}")

    translated_text = nmt.translate(source_text, target_lang=target_lang, source_lang=source_lang)

    return {"result": translated_text}
