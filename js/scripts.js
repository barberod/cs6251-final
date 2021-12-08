/**
 * Script to process the submitted form data of the form in file
 * fees.html 
 */
// JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

// event listeners on course checkboxes
document.getElementById('course01').addEventListener('change', (event)=> {
    toggleElement('course01', 'course01child');
    document.getElementById('course01supplies').checked = false;
})
document.getElementById('course04').addEventListener('change', (event)=> {
    toggleElement('course04', 'course04child');
    document.getElementById('course04supplies').checked = false;
})
document.getElementById('course05').addEventListener('change', (event)=> {
    toggleElement('course05', 'course05child');
    document.getElementById('course05supplies').checked = false;
})
document.getElementById('course08').addEventListener('change', (event)=> {
    toggleElement('course08', 'course08child');
    document.getElementById('course08supplies').checked = false;
})
document.getElementById('course09').addEventListener('change', (event)=> {
    toggleElement('course09', 'course09child');
    document.getElementById('course09supplies').checked = false;
})

// event listeners for button click
document.getElementById('cost-button').addEventListener('click', calculateAndDisplayCosts);

// JavaScript for toggling one element based on checkbox of another element
function toggleElement(parentId, childId) {
    var child = document.getElementById(childId);
    if (document.getElementById(parentId).checked) {
        child.classList.remove("d-none");
    } else {
        child.classList.add("d-none");
    }
}

/**
 * Checks if any checkboxes are checked and, if they are
 * calculates total costs and displays them in the results
 * element. Otherwise, hides the results element.
 */
function calculateAndDisplayCosts() {
    let costArea = document.getElementById('cost-area');

    if (!validateCourses()) {
        costArea.classList.add("d-none");

    } else {
        costArea.classList.remove("d-none");
        document.getElementById('total-cost').innerHTML = sumCourseCosts();
    }

}

/**
 * Checks if any course checkboxes are checked
 * 
 * @returns (boolean) true if any checkboxes are checked
 */
function validateCourses() {
    let checkboxes = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

/**
 * Sums the values of course checkboxes that are checked
 * 
 * @returns (number) the sum of the values of the checked checkboxes
 */
function sumCourseCosts() {
    let total = 0;
    let checkboxes = document.getElementsByClassName("form-check-input");

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            total += checkboxes[i].value;
        }
    }

    return total;
}