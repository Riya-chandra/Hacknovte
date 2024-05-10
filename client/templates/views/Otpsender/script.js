document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sendButton").addEventListener("click", async function() {
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      const dataSend = {
        email: email,
        subject: subject,
        message: message,
      };
  
      try {
        const res = await fetch("http://your-api-url.com/email/sendEmail", {
          method: "POST",
          body: JSON.stringify(dataSend),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        if (res.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  