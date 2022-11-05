// import crypto from "crypto";
import webpush from "web-push";
import { Push } from "../models/push_model.js";
import { gl, rl, yl, f_str } from "./logger.js";
import Cron from "cron";

const vapidKeys = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// todo cron_job_test   "0 */5 * * * *"
const payload_morninig = JSON.stringify({
  title: "Welcome Robert",
  body: "Բարի լույս",
  icon: "https://cdn3.iconfinder.com/data/icons/happy-x-mas/501/santa15-128.png",
  image:
    "https://www.pngkit.com/png/detail/37-370928_banner-printing-full-color-premium-banners-cheap-banners.png",
  actions: [
    {
      action: "like",
      title: "Explore this new world",
      icon: "cold-drink.png",
    },
    {
      action: "reply",
      title: "Close notification",
      icon: "images/xmark.png",
    },
  ],
});

const options = {
  TTL: 0,
};

const job = new Cron.CronJob("0 30 05 * * *", async function () {
  const docs = await Push.find();
  yl.log(f_str(docs.length));

  for (let i = 0; i < docs.length; i++) {
    try {
      await webpush.sendNotification(
        {
          endpoint: docs[i].endpoint,
          keys: {
            p256dh: docs[i].keys.p256dh,
            auth: docs[i].keys.auth,
          },
        },
        payload_morninig,
        options
      );
      yl.log(f_str("Send cron push notification"));
    } catch (err) {
      yl.log(f_str(err));
    } finally {
      yl.log(f_str("cron has started"));
    }
  }
});

job.start();

// todo periodic_job
const payload_1 = JSON.stringify({
  title: "Welcome Robert",
  body: "Կրկնվող հաղորդագրություն",
  icon: "https://cdn3.iconfinder.com/data/icons/happy-x-mas/501/santa15-128.png",

  image:
    "https://www.pngkit.com/png/detail/37-370928_banner-printing-full-color-premium-banners-cheap-banners.png",

  actions: [
    {
      action: "like",
      title: "Explore this new world",
      icon: "cold-drink.png",
    },
    {
      action: "reply",
      title: "Close notification",
      icon: "images/xmark.png",
    },
  ],
});

const options_1 = {
  TTL: 600,
};

const job_1 = new Cron.CronJob("0 */10 5-20 * * *", async function () {
  // Every 30 minutes between 18-24
  const docs = await Push.find();
  yl.log(f_str(docs.length));

  for (let i = 0; i < docs.length; i++) {
    try {
      await webpush.sendNotification(
        {
          endpoint: docs[i].endpoint,
          keys: {
            p256dh: docs[i].keys.p256dh,
            auth: docs[i].keys.auth,
          },
        },
        payload_1,
        options_1
      );
      yl.log(f_str("Send cron push notification"));
    } catch (err) {
      yl.log(f_str(err));
    } finally {
      yl.log(f_str("job_1 has started"));
    }
  }
});

job_1.start();

// todo
const payload = JSON.stringify({
  title: "Welcome Robert",
  body: "Բարի լույս",
  icon: "https://cdn3.iconfinder.com/data/icons/happy-x-mas/501/santa15-128.png",
  image:
    "https://www.pngkit.com/png/detail/37-370928_banner-printing-full-color-premium-banners-cheap-banners.png",
  actions: [
    {
      action: "like",
      title: "Explore this new world",
      icon: "cold-drink.png",
    },
    {
      action: "reply",
      title: "Close notification",
      icon: "images/xmark.png",
    },
  ],
});

async function welcome(req, res, next) {
  await webpush
    .sendNotification(req.body, payload)
    .then(function () {
      yl.log(f_str("Sended welcome push notification"));
    })
    .catch((err) => {
      rl.log(f_str("Unable to send welcome push notification", err));
      res.status(500).send("subscription not possible");
      return;
    });

  next();
}

// todo
async function check_sub(req, res) {
  const is_sub = await Push.findOne({ endpoint: req.body.endpoint });

  if (is_sub) {
    gl.log(f_str("client is subscribed"));
    res.json("yes");
  } else {
    rl.log(f_str("client is not subscribed"));
    res.json("no");
  }
}

// todo
async function handlePushNotificationSubscription(req, res) {
  try {
    const user_sub = await Push.findOne({ endpoint: req.body.endpoint });

    if (!user_sub) {
      const push = new Push({
        endpoint: req.body.endpoint,
        keys: {
          p256dh: req.body.keys.p256dh,
          auth: req.body.keys.auth,
        },
      });

      await push.save();

      res.status(201).json({ endpoint_is: req.body.endpoint });
    }
  } catch (err) {
    rl.log(f_str(err));
  } finally {
    yl.log(f_str("sub_saved finished"));
  }
}

// todo
async function unsubscribe(req, res) {
  try {
    await Push.findOneAndDelete({ endpoint: req.body.endpoint });

    res.json("ok unsubscribe");
    //
  } catch (err) {
    rl.log(f_str(err.message));
  }
}

// todo
export { welcome, handlePushNotificationSubscription, check_sub, unsubscribe };
