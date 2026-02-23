// ✅ Load members from localStorage or add default member
let members = JSON.parse(localStorage.getItem("members"));
if (!members || members.length === 0) {
  members = [
    {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1 555 123 4567",
      plan: "Premium (Gym + Classes)",
    },
  ];
  localStorage.setItem("members", JSON.stringify(members));
}

// ✅ Render Members
function renderMembers() {
  const tbody = document.querySelector("#members-table tbody");
  tbody.innerHTML = "";

  members.forEach((member, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone || "-"}</td>
            <td>${member.plan}</td>
            <td class="actions">
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="removeMember(${index})">Remove</button>
            </td>
        `;
    tbody.appendChild(tr);
  });

  localStorage.setItem("members", JSON.stringify(members));
}

// ✅ Add Member
function addMember(event) {
  event.preventDefault();

  const name = document.getElementById("member-name").value;
  const email = document.getElementById("member-email").value;
  const phone = document.getElementById("member-phone").value;
  const plan = document.getElementById("member-plan").value;

  members.push({ name, email, phone, plan });
  renderMembers();

  document.getElementById("member-form").reset();
}

// ✅ Remove Member
function removeMember(index) {
  members.splice(index, 1);
  renderMembers();
}

// ✅ Edit Member
function editMember(index) {
  const member = members[index];

  document.getElementById("member-name").value = member.name;
  document.getElementById("member-email").value = member.email;
  document.getElementById("member-phone").value = member.phone;
  document.getElementById("member-plan").value = member.plan;

  removeMember(index);
}

// ✅ Clear All Members
function clearMembers() {
  if (confirm("Are you sure you want to delete all members?")) {
    members = [];
    localStorage.removeItem("members");
    renderMembers();
  }
}

// ✅ Initial Render
renderMembers();
