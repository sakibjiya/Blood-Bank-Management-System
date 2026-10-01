// Donor data
let donors = [];

// Registration form
const donorForm = document.getElementById("donorForm");

donorForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;

    // Check age
    if (age < 18) {
        alert("Donor must be 18 years or older.");
        return;
    }

    // Create donor object
    const donor = {
        name: name,
        age: age,
        bloodGroup: bloodGroup,
        phone: phone,
        city: city
    };

    // Add donor
    donors.push(donor);

    // Update table
    displayDonors();

    // Update blood group count
    updateBloodCounts();

    // Clear form
    donorForm.reset();

    alert("Donor registered successfully!");
});


// Display donors
function displayDonors(list = donors) {

    const table = document.getElementById("donorTable");

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No donors found</td>
            </tr>
        `;

        return;
    }

    list.forEach(function(donor, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donor.name}</td>
            <td>${donor.age}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.phone}</td>
            <td>${donor.city}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteDonor(${index})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// Delete donor
function deleteDonor(index) {

    if (confirm("Are you sure you want to delete this donor?")) {

        donors.splice(index, 1);

        displayDonors();

        updateBloodCounts();
    }
}


// Search donor
document.getElementById("search").addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const filteredDonors = donors.filter(function(donor) {

        return (
            donor.name.toLowerCase().includes(searchValue) ||
            donor.bloodGroup.toLowerCase().includes(searchValue) ||
            donor.city.toLowerCase().includes(searchValue)
        );

    });

    displayDonors(filteredDonors);
});


// Update blood group counts
function updateBloodCounts() {

    const bloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-"
    ];

    bloodGroups.forEach(function(group) {

        const count = donors.filter(function(donor) {

            return donor.bloodGroup === group;

        }).length;

        document.getElementById(group).textContent =
            count + " Donors";
    });
}


// Scroll to registration
function scrollToRegister() {

    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}