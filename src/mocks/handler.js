import { setupWorker, rest } from "msw";

const worker = setupWorker(
  // Provide request handlers
  rest.post(`${import.meta.env.VITE_APP_API_URL}/register`, (req, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.json({
        username: "Test",
        email: "test@gmail.com",
      })
    )
  ),
  rest.post(`${import.meta.env.VITE_APP_API_URL}/login`, (req, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.json({
        username: "Test",
        email: "test@gmail.com",
      })
    )
  ),
  rest.get(`${import.meta.env.VITE_APP_API_URL}/logout`, (req, res, ctx) =>
    res(
      ctx.delay(5000),
      ctx.json({
        message: "Çıkış yapıldı..",
      }),
      ctx.status(201)
    )
  )
);

// Start the Mock Service Worker
worker.start();
