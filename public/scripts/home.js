// change how nav buttons look when hovering, mousedown, ... on them
function styleNavButtons() {
    let navBtns = document.querySelectorAll('nav button');
    let buttonHeld = null;
    let mouseOnButtonHeld = false;
    navBtns.forEach(button => {  
        button.onmouseenter = function() {
            if (button == buttonHeld) {
                // just take note of this event
                // but otherwise do nothing
                mouseOnButtonHeld = true;
                return;
            }
    
            let buttonClass = button.classList;    
            buttonClass.add('button-hover');
        }
  
        // different from onmouseout
        button.onmouseleave = function() {
            if (button == buttonHeld) {
                mouseOnButtonHeld = false;
                return;
            }
            
            let buttonClass = button.classList;      
            buttonClass.remove('button-hover');   
        }

        button.onmousedown = function() {
            buttonHeld = button;
            button.classList.replace('button-hover', 'button-onmousedown');
        }  
    });
  
    // release the held button when onmouseup, regardless of
    // where your cursor is
    document.onmouseup = function() {
        if (buttonHeld) { // if buttonHeld really refers to a button      
            let buttonClass = buttonHeld.classList;
            if (mouseOnButtonHeld) {
                buttonClass.replace('button-onmousedown', 'button-hover');
            } else {
                buttonClass.remove('button-onmousedown');
            }      
            buttonHeld = null;
        }
    }
    
}

window.onload = function() {
    styleNavButtons();

    /* login */
    document.getElementById('loginButton').onclick = function() {
        fetch('/login')
            .then(function(response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(function(htmlContent) {                
                document.getElementById('main').innerHTML = htmlContent;

                // add script
                let sc = document.createElement("script");
                sc.setAttribute("src", "scripts/login_form_html.js");
                sc.setAttribute("type", "text/javascript");
                document.head.appendChild(sc);
            })
            .catch(function(error) {
                console.log('Fetch error:', error);
            });
    }
}



