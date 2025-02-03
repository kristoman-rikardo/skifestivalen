// Dette er Dalai Solutions AS sin eiendom, på leie til Holmenkollen Skifestival AS. Bruk utover avtale er ikke tillat.    
let widgetDescription = " ";
let inputPlaceholder = " ";
let browser_url = window.location.href;

 if (browser_url.includes('/en')) {
widgetDescription = "I'm quite smart, but I need a couple of seconds to think it through⛷️ I'm still in training and may make some minor mistakes.";
inputPlaceholder = "Message...";
} else if (browser_url.includes('de')) {
widgetDescription = "Ich bin ziemlich klug, aber ich brauche ein paar Sekunden, um nachzudenken⛷️Ich bin noch in der Ausbildung und könnte einige kleine Fehler machen.";
inputPlaceholder = "Nachricht schreiben...";
} else {
widgetDescription = "Jeg er ganske smart, men trenger et par sekunder for å tenke meg om⛷️Jeg er fortsatt under opplæring, og kan derfor gjøre små feil.";
inputPlaceholder = "Skriv melding..."
}

// Definer FormExtension
const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form');
  
      // Form HTML
      formContainer.innerHTML = `
        <style>
          form {
            font-family: 'Roboto', sans-serif;
            max-width: 100%;
            margin: auto;
            padding: 0px;
            background-color: transparent;
            border-radius: 8px;
          }
          label {
            font-size: 1em;
            color: #333;
            display: block;
            margin: 10px 0 5px;
            font-weight: 500;
          }
          input[type="text"], input[type="email"], textarea {
            width: 100%;
            border: 2px solid #C6007D;
            background-color: #fff;
            color: #333;
            margin: 10px 0;
            padding: 10px;
            outline: none;
            font-size: 1em;
            font-family: Arial, sans-serif;
            border-radius: 8px;
            box-sizing: border-box;
          }
          textarea {
            height: 100px;
          }
          .submit {
            background-color: #C6007D;
            border: none;
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            width: 100%;
            cursor: pointer;
            font-size: 1em;
            font-weight: 500;
          }
          .success-message {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5em;
            font-weight: bold;
            color: #2C7E7C;
          }
          .success-icon {
            font-size: 3em;
            color: #2C7E7C;
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: 'Roboto', sans-serif;
            font-size: 1.2em;
            color: #666;
          }
        </style>
  
        <label for="email">Mail</label>
        <input type="email" class="email" name="email" required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Ugyldig e-post"><br><br>
  
        <label for="topic">Emne</label>
        <input type="text" class="topic" name="topic" required><br><br>
  
        <label for="userQuestion">Melding</label>
        <textarea class="userQuestion" name="userQuestion" required></textarea><br><br>
  
        <input type="submit" class="submit" value="Send">
      `;
  
      // Submit Event Listener
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
  
        // Collect form values
        const email = formContainer.querySelector('.email').value;
        const topic = formContainer.querySelector('.topic').value;
        const userQuestion = formContainer.querySelector('.userQuestion').value;
  
        // Validate data if needed
        if (!email || !topic || !userQuestion) {
          alert('Du må fylle ut alle feltene!');
          return;
        }
  
        window.voiceflow.chat.interact({
          type: 'text',
          payload: {
            email,
            topic,
            userQuestion,
          },
        });
  
        element.innerHTML = `
          <div class="loading">Sender inn skjemaet...</div>
        `;
  
        setTimeout(() => {
          element.innerHTML = `
            <div class="success-message">
              <div class="success-icon">✅</div>
              <div>Skjemaet er sendt inn!</div>
            </div>
          `;
        }, 1500); 
      });

       window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          email: emailInput.value,
          topic: topicInput.value,
          userQuestion: userQuestionInput.value,
        },
      });
  
      if (element) {
        element.appendChild(formContainer);
      } else {
        console.error('Invalid element passed to render function.');
      }
    },
  };  
// Last inn Chat-widget
let script = document.createElement("script");
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '675da724bdfd5f757ce9d106' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant:  {
            extensions: [FormExtension],
            banner: { description: widgetDescription },
            inputPlaceholder: inputPlaceholder
          },
          launch: {
            event: { type: "launch", payload: { browser_url: window.location.href } }
      }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
