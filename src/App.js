import './App.css';
import Header from './components/headers/Header';
import Pages from './components/mainPages/Pages';
import Footer from './components/headers/Footer';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function App() {
  const [language, setLanguage] = useState('en'); // replace 'hi' with your desired language code
  const location = useLocation()
  var path = location.pathname

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  // useEffect(() => {
  //   if (localStorage.getItem("isModal") !== "false") {
  //     Swal.fire({
  //       title: '<strong>Select Language </strong>',
  //       icon: 'info',
  //       html:
  //         ' Select a language to view this website in:',
  //       showCloseButton: true,
  //       showCancelButton: true,
  //       focusConfirm: false,
  //       confirmButtonText:
  //         'English',
  //       confirmButtonAriaLabel: 'Thumbs up, great!',
  //       cancelButtonText:
  //         ' हिंदी',
  //       cancelButtonAriaLabel: 'Thumbs down'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         handleLanguageSelect('en');
  //         localStorage.setItem("isModal", false)
  //         localStorage.setItem("lan", "en")
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         handleLanguageSelect('hi');
  //         localStorage.setItem("isModal", false)
  //         localStorage.setItem("lan", "hi")
  //       }
  //     });
  //   }

  //   if (localStorage.getItem("lan") == "hi") {
  //     translateToHindi("hi")
  //   }
  //   if (localStorage.getItem("lan") == "en") {
  //     translateToHindi("en")
  //   }
  // }, [language, path, localStorage]);
  function translateToHindi(ln) {
    const apiKey = "AIzaSyDK-YBCVq3NGJFwjOpIJfqf3Vb23pu7AG4";
    const targetLanguage = ln

    // Translate all elements with the data-translate attribute
    document.querySelectorAll("[data-translate]").forEach(function (el) {
      const textToTranslate = el.textContent;
      translateText(textToTranslate, apiKey, targetLanguage)
        .then(function (translatedText) {
          el.textContent = translatedText;
        })
        .catch(function (error) {
          console.log("Translation failed.", error);
        });
    });

    // Translate all image alt and title attributes


    // Translate all CSS content
    // document.querySelectorAll("*").forEach(function (el) {
    //   const cssTextToTranslate = el.getAttribute("style");
    //   if (cssTextToTranslate !== null) {
    //     translateText(cssTextToTranslate, apiKey, targetLanguage)
    //       .then(function (translatedText) {
    //         el.setAttribute("style", translatedText);
    //       })
    //       .catch(function (error) {
    //         console.log("Translation failed.", error);
    //       });
    //   }
    // });

    // Translate all input tags
    document.querySelectorAll("input").forEach(function (input) {
      const placeholderToTranslate = input.getAttribute("placeholder");
      const valueToTranslate = input.getAttribute("value");
      if (placeholderToTranslate !== null) {
        translateText(placeholderToTranslate, apiKey, targetLanguage)
          .then(function (translatedText) {
            input.setAttribute("placeholder", translatedText);
          })
          .catch(function (error) {
            console.log("Translation failed.", error);
          });
      }
      if (valueToTranslate !== null) {
        translateText(valueToTranslate, apiKey, targetLanguage)
          .then(function (translatedText) {
            input.setAttribute("value", translatedText);
          })
          .catch(function (error) {
            console.log("Translation failed.", error);
          });
      }
    });
    const formLabels = document.querySelectorAll("form label:not([for^='checkbox']):not([for^='radio'])");

    // Translate the text of each label element
    formLabels.forEach(function(label) {
      const textToTranslate = label.childNodes[0].nodeValue; // Get the text node of the label
      translateText(textToTranslate, apiKey, targetLanguage)
        .then(function(translatedText) {
          label.childNodes[0].nodeValue = translatedText; // Update the text node of the label
        })
        .catch(function(error) {
          console.log("Translation failed.", error);
        });
    }
    )
    // document.querySelectorAll("label:not([for^='checkbox']):not([for^='radio'])").forEach(function(label) {

    //   const textToTranslate = label.textContent;
    //   translateText(textToTranslate, apiKey, targetLanguage)
    //     .then(function(translatedText) {
    //       label.textContent = translatedText;
    //     })
    //     .catch(function(error) {
    //       console.log("Translation failed.", error);
    //     });
    // });



  }



  function translateText(textToTranslate, apiKey, targetLanguage) {
    return fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: textToTranslate,
          target: targetLanguage,
        }),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data.data.translations[0].translatedText;
      });
  }
  return (
    <div className="App">

      <Header />
      <Pages />
      <Footer />
    </div>
  );
}

export default App;
