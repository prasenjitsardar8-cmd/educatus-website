const EDUCATUS_WHATSAPP_NUMBER = "919432808518";

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

function handleScroll() {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  if (progress) {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = percent + "%";
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menu.classList.toggle("open", isOpen);
    document.body.classList.toggle("lock", isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.classList.remove("open");
      document.body.classList.remove("lock");
    });
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".faq-list article").forEach(item => {
  const button = item.querySelector("button");
  const answer = item.querySelector("div");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const alreadyOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-list article.open").forEach(openItem => {
      openItem.classList.remove("open");
      const openAnswer = openItem.querySelector("div");
      if (openAnswer) openAnswer.style.maxHeight = null;
    });

    if (!alreadyOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

function buildWhatsAppUrl(message) {
  return `https://wa.me/${EDUCATUS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".wa").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const message =
      link.dataset.msg ||
      "Hello Educatus, I would like to enquire about your classes.";

    window.location.href = buildWhatsAppUrl(message);
  });
});

const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "Not provided";
    const grade = document.getElementById("grade")?.value.trim() || "Not provided";
    const interest = document.getElementById("interest")?.value || "Not specified";
    const timing = document.getElementById("timing")?.value.trim() || "Flexible";

    const message = `Hello Educatus, I would like to enquire about your classes.

Parent / Guardian: ${name}
Child's grade / age: ${grade}
Interested in: ${interest}
Preferred timing: ${timing}

Please share the available batches, timings and fees.`;

    window.location.href = buildWhatsAppUrl(message);
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
