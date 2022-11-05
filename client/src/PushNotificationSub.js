import React, { useEffect, useState, useRef } from "react";
import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationsOff,
} from "react-icons/md";

const pushServerPublicKey =
  "BENstEvIyyrNaEITYnu17SVy-52yZnZdr5-5GdX-rWLJjcYFGAvaTGTdV7ZsfjbFDidhlzgWGMQixF2XSGtE_kU";

//! s-0
function browser_updated() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("\u{2705}  s-0: browser is up to date");
    return true;
  } else {
    alert("Կներեք, բայց ձեր բրաուզերը հին է։");
    return false;
  }
}
const browser_up = browser_updated();

// todo
export default function PushNotification() {
  //
  const sw_reg = useRef();
  const subscr = useRef();

  const [sub_status, setStatus] = useState(false);

  //* init part
  useEffect(() => {
    async function init() {
      try {
        //! s-3-4
        sw_reg.current = await navigator?.serviceWorker?.getRegistration(); //ready
        if (!sw_reg.current) {
          sw_reg.current = await navigator.serviceWorker.register("/sw.js");
          await sw_reg.current.update();
        }
        console.log("❓", sw_reg.current?.active?.state);
        console.log("\u{2705} s-3-4: sw_reg is success");

        //! s-5-6
        subscr.current = await sw_reg.current?.pushManager.getSubscription();
        if (!subscr.current) {
          subscr.current = await sw_reg.current.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: pushServerPublicKey,
          });
        }
        console.log("\u{2705}  s-5-6: subscr is success");

        //! check status
        const response = await fetch("/check_sub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint: subscr.current.endpoint }),
        });
        const result = await response.json();
        if (response.ok) {
          if (result === "yes") {
            setStatus(true);
            console.log("✅  s-7-8-9-10: client subscription is saved in db");
          } else {
            console.log(
              "⛔ s-7-8-9-10: client subscription is not saved in db"
            );
            setStatus(false);
          }
        }
      } catch (err) {
        alert("vat ban katarvec");
        return;
      } finally {
        //
      }
    }
    init();
  }, []);

  //* save_sub_on_server
  async function save_sub() {
    //! s-1-2
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    } else if (Notification.permission === "denied") {
      alert("Դուք մերժել եք բաժանորդագրվելը։");
      return;
    }
    if (Notification.permission === "granted") {
      console.log("✅ s-1-2: notification is granted");
    }

    //! s-7-8-9-10
    const response = await fetch("/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscr.current),
    });
    const result = await response.json();
    console.log(result); // returns endpoint

    if (response.ok) {
      setStatus(true);
      console.log(
        "✅ s-7-8-9-10: client subscription is saved in db successfully"
      );
    }
  }

  //* unsubscribe
  async function unsubscribe() {
    try {
      const response = await fetch("/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint: subscr.current.endpoint }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // await subscr.current.unsubscribe();
        setStatus(false);
        console.log("✅ You've successfully unsubscribed");
      }
    } catch (err) {
      console.log("⛔ Unsubscribing failed");
    }
  }

  //* return
  return (
    <>
      {browser_up && sub_status ? (
        <button
          type="button"
          className="btn btn-outline-success btn-sm m-3"
          onClick={unsubscribe}
        >
          <MdOutlineNotificationsActive size={22} /> Unsubscribe
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm m-3"
          onClick={save_sub}
        >
          <MdOutlineNotificationsOff size={22} /> Subscribe
        </button>
      )}
    </>
  );
}
