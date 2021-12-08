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

// event listener for DOM loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('ageGroup').innerHTML = getAgeGroupOptions();
    document.getElementById('membershipLevel').innerHTML = getMembershipLevelOptions();
});

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

/**
 * Gets the Age Group selector options from an array
 * 
 * @returns (string) Age Group selector options
 */
function getAgeGroupOptions() {
    const ageGroups = ["Adult", "Teen", "Kid"];

    let options = '';
    for (let i = 0; i < ageGroups.length; i++) {
        options += '<option value="' + ageGroups[i] + '">' + ageGroups[i] + '</option>';
    }

    return options;
}

/**
 * Gets the Membership Level selector options from an array
 * 
 * @returns (string) Membership Level selector options
 */
 function getMembershipLevelOptions() {
    let membershipLevels = [];
    membershipLevels[0] = "Non-Member (No Discount)";
    membershipLevels[10] = "Bronze (10% Off)";
    membershipLevels[25] = "Silver (25% Off)";
    membershipLevels[50] = "Gold (50% Off)";

    let options = '';
    for (var key in membershipLevels) {
        options += '<option value="' + key + '">' + membershipLevels[key] + '</option>';
    }

    return options;
}

// Toggles one element based on checkbox of another element
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

    if (!validFirstName() || !validLastName()) {
        costArea.classList.remove("d-none");
        document.getElementById('total-cost').innerHTML = "$" + sumCourseCosts().toFixed(2);
        document.getElementById('attendee-full-name').innerHTML = getFullName();
        document.getElementById('attendee-age-group').innerHTML = document.getElementById("ageGroup").value;
        document.getElementById('attendee-discount').innerHTML = getDiscount();
        document.getElementById('attendee-course-list').innerHTML = getSelectedCoursesAsUnorderedList();
    } else {
        costArea.classList.add("d-none");
    }
}

/**
 * Sums the values of course checkboxes that are checked
 * 
 * @returns (int) the sum of the values of the checked checkboxes
 */
function sumCourseCosts() {
    let total = 0;
    let discount = 1 - (parseInt(document.getElementById("membershipLevel").value) / 100);
    let checkboxes = document.getElementsByClassName("form-check-input");

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            total += parseInt(checkboxes[i].value);
        }
    }

    total *= discount;
    return total;
}

/**
 * Gets the value of the First Name input and checks its length
 * 
 * @returns (boolean) true if firstName value is valid
 */
function validFirstName() {
    let firstName = document.getElementById("firstName").value;
    if (firstName != null && firstName != undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * Gets the value of the Last Name input and checks its length
 * 
 * @returns (boolean) true if lastName value is valid
 */
 function validLastName() {
    let lastName = document.getElementById("lastName").value;
    if (lastName != null && lastName != undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * Gets the values of the Age Group input
 * 
 * @returns (string) the values of the Age Group input
 */
 function getFullName() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    return firstName + " " + lastName;
}

/**
 * Gets the value of the Membership Level input unless it is 0
 * 
 * @returns (string) the value of the Membership Level input unless it is 0
 */
 function getDiscount() {
    if (parseInt(document.getElementById("membershipLevel").value) > 0) {
        return "Discount " + document.getElementById("membershipLevel").value + "% Off"
    } else {
        return "No Discount";
    }
}

/**
 * Gets the data attribute for each course checkbox that is
 * checked and assembles an unordered list accordingly
 * 
 * @returns (string) an HTML unorderd list of courses
 */
function getSelectedCoursesAsUnorderedList() {
    let checkboxes = document.getElementsByClassName("form-check-input");
    let unorderedList = '<ul>';
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            unorderedList += '<li>' + checkboxes[i].getAttribute("data") + '</li>';
        }
    }
    unorderedList += '</ul>';
    return unorderedList;
}