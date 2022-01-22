import { Application } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";
const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${end}ms`);
});

app.use((ctx) => {
  ctx.response.body = `
  {____     {__      {_           {__ __        {_
  {_  {__   {__     {_ __      {__     {__     {_ __
  {__  {__  {__    {_  {__      {__           {_  {__
  {__   {__ {__   {__   {__        {__       {__   {__
  {__    {_ {__  {______ {__          {__   {______ {__
  {__     {_ __ {__       {__  {__     {__ {__       {__
  {__       {__{__         {__   {__ __   {__         {__
                    Mission Control API`;
});

if (import.meta.main) {
  log.info(`Server is running on Port: ${PORT}`);
  await app.listen({
    port: PORT,
  });
}
