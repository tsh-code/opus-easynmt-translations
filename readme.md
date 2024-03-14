# Translation LLM Lambda

## Description

Description:

This repository provides a simple yet powerful solution for running the Opus-MT (Machine Translation) model for text translation within an AWS Lambda. Opus-MT is a state-of-the-art machine translation system that supports translation between multiple languages, offering high-quality translations for various text inputs.

### Built with
- SST
- EasyNMT

## Getting started

### Prerequisites

AWS account

### Install

```
npm i
npx sst deploy
```

### Usage


```
POST /api/translate/{languegeCode} 
{
    "text": "Insert your text here"
}
```

Example:
`/api/translate/EN`


```
{
    "text": "Pytasz, co w moim życiu z wszystkich rzecz główną, Powiem ci: śmierć i miłość – obydwie zarówno. Jednej oczu się czarnych drugiej – modrych boję. Te dwie są me miłości i dwie śmierci moje."
}
```
Result: 
```
{
    "result": "You ask what in my life of all the principal thing, I will tell you: death and love both. One's eyes are black and the other's, I'm afraid. These two are my love and my two deaths."
}
```
Bear in mind that without pre-loaded models it would initially take around 15s to get first response, translations will by way faster.

### See also

- [Helsinki University website](https://www.helsinki.fi/en)
- [Language Technology Research Group at the University of Helsinki huggingface](https://huggingface.co/Helsinki-NLP)
- [EasyNMT](https://github.com/UKPLab/EasyNMT)

### To-do
- [x] Docker image
- [x] SST simple api
- [ ] Hide API behind api-key
- [x] Create lambdas with opus-mt preloaded

### License

This project is licensed under the [MIT License](LICENSE.md).
