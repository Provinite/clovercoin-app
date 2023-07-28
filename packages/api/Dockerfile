# Dockerfile for cc-api server. Note, the app should already
# be built and bundled using `yarn build`.

# Stage 1 - builder, installs necessary external dependencies.
# Separate stage since we don't need all of the
# node-gyp dependencies to actually run the app
FROM public.ecr.aws/lambda/nodejs:18 as build
WORKDIR ${LAMBDA_TASK_ROOT}

RUN echo "{}" > package.json
RUN npm i -g yarn
RUN yarn add bcrypt@5.0.1 app-root-path@3.1.0

# Stage 2 - runner, takes in just the bundled app and node_modules
# generated on the builder
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./dist/app.mjs .
COPY ./dist/app.mjs.map .
COPY  --from=build ${LAMBDA_TASK_ROOT}/node_modules ./node_modules/

ENV NODE_OPTIONS=--enable-source-maps
ENV CC_LISTEN=false
CMD [ "app.handler" ]