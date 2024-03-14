FROM alpine:latest AS model

ARG LANGUAGE_CODE_PAIR
ENV LANGUAGE_CODE_PAIR=$LANGUAGE_CODE_PAIR
RUN test -n "$LANGUAGE_CODE_PAIR" || (echo "ERROR: LANGUAGE_CODE_PAIR is empty!" && exit 1)

RUN apk update && apk add --no-cache curl git git-lfs
RUN git lfs install

RUN git clone https://huggingface.co/Helsinki-NLP/opus-mt-${LANGUAGE_CODE_PAIR} /tmp/models
RUN rm -rf /tmp/models/.git


FROM amazon/aws-lambda-python:3.9

COPY ./requirements.txt .
COPY --from=model /tmp/models /tmp/models

ENV EASYNMT_CACHE /tmp/models
ENV NLTK_DATA=/tmp/nltk_data
ENV HOME /tmp

RUN yum -y install gcc-c++
RUN pip install --no-cache-dir torch --extra-index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt


COPY handler.py ${LAMBDA_TASK_ROOT}

CMD ["handler.main"]

