FROM node:10-alpine AS build
COPY . /usr/app
WORKDIR /usr/app
RUN yarn install && yarn build


FROM node:10-alpine
WORKDIR /usr/app
EXPOSE 5000
COPY --from=build /usr/app/build /usr/app
RUN yarn global add serve

CMD ["serve"]
