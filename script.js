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

const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
      form {
      font-family: 'Roboto', sans-serif;
      max-width: 100%;
      margin: auto;
      padding: 8px;
      background-color: transparent;
      border-radius: 8px;
    }

    label {
      color: #333;
      display: block;
      margin: 6px 0 3px;
      font-weight: 500;
    }

    input[type="text"], input[type="email"], textarea {
      width: 100%;
      border: 1px solid pink;
      background-color: #fff;
      color: #333;
      margin: 6px 0;
      padding: 6px;
      outline: none;
      font-family: Arial, sans-serif;
      border-radius: 6px;
      box-sizing: border-box;
    }

    textarea {
      height: 70px;
    }

    .invalid {
      border-color: red;
    }

    .submit {
      background-color: pink;
      border: none;
      color: white;
      padding: 8px;
      border-radius: 6px;
      margin-top: 12px;
      width: 100%;
      cursor: pointer;
      font-weight: 500;
    }
      </style>

      <label for="email">Mail</label>
      <input type="email" class="email" name="email" required
             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
             title="Ugyldig e-post"><br>

      <label for="topic">Emne</label>
      <input type="text" class="topic" name="topic" required><br>

      <label for="userQuestion">Melding</label>
      <textarea class="userQuestion" name="userQuestion" required></textarea><br>

      <input type="submit" class="submit" value="Send">
    `;

    const emailInput = formContainer.querySelector('.email');
    const topicInput = formContainer.querySelector('.topic');
    const userQuestionInput = formContainer.querySelector('.userQuestion');

    emailInput.value = trace.payload.email || '';
    topicInput.value = trace.payload.topic || '';
    userQuestionInput.value = trace.payload.userQuestion || '';

    formContainer.addEventListener('input', function () {
      if (emailInput.checkValidity()) emailInput.classList.remove('invalid');
      if (topicInput.checkValidity()) topicInput.classList.remove('invalid');
      if (userQuestionInput.checkValidity()) userQuestionInput.classList.remove('invalid');
    });

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!emailInput.checkValidity() || !topicInput.checkValidity() || !userQuestionInput.checkValidity()) {
        if (!emailInput.checkValidity()) emailInput.classList.add('invalid');
        if (!topicInput.checkValidity()) topicInput.classList.add('invalid');
        if (!userQuestionInput.checkValidity()) userQuestionInput.classList.add('invalid');
        return;
      }

      formContainer.querySelector('.submit').remove();

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          email: emailInput.value,
          topic: topicInput.value,
          userQuestion: userQuestionInput.value,
        },
      });

      // Etter 5 sekunder byttes skjemaet ut med "Skjemaet er lukket."
      setTimeout(() => {
        formContainer.innerHTML = '<p>Skjemaet er lukket.</p>';
      }, 5000);
    });

    element.appendChild(formContainer);
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
