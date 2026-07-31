/* =========================================================
   ENGINEERHUB — register.js
   Multi-step onboarding wizard: validation, choice pills,
   progress bar, and final roadmap-generation stub.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const TOTAL_STEPS = 7;
  let currentStep = 1;

  const form = document.getElementById('onboardForm');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const stepProgress = document.getElementById('stepProgress');
  const formHeader = document.getElementById('formHeader');
  const loginSwitch = document.getElementById('loginSwitch');

  const panes = () => form.querySelectorAll('.step-pane');
  const paneFor = (step) => form.querySelector(`.step-pane[data-step="${step}"]`);

  /* ---------- Answers store ---------- */
  const answers = { goal: [], experience: [], studyDays: [], interests: [] };

  /* ---------- Password show/hide ---------- */
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.toggle);
      const isPw = input.type === 'password';
      input.type = isPw ? 'text' : 'password';
      btn.textContent = isPw ? 'Hide' : 'Show';
    });
  });

  /* ---------- Choice pills (single / multi select) ---------- */
  form.querySelectorAll('[data-choice]').forEach(group => {
    const key = group.dataset.choice;
    const mode = group.dataset.mode;
    group.querySelectorAll('.choice-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (mode === 'single') {
          group.querySelectorAll('.choice-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          answers[key] = [pill.textContent];
        } else {
          pill.classList.toggle('selected');
          answers[key] = Array.from(group.querySelectorAll('.choice-pill.selected')).map(p => p.textContent);
        }
        setHint(key, '');
      });
    });
  });

  /* ---------- Helpers ---------- */
  function setHint(field, message) {
    const hintEl = form.querySelector(`[data-hint-for="${field}"]`);
    if (hintEl) hintEl.textContent = message;
  }

  function showStep(step) {
    panes().forEach(p => p.classList.remove('active'));
    const target = paneFor(step);
    if (target) target.classList.add('active');

    if (step === 'success') {
      stepProgress.style.display = 'none';
      formHeader.style.display = 'none';
      loginSwitch.style.display = 'none';
    } else {
      stepProgress.style.display = 'flex';
      const pct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
      progressBar.style.width = pct + '%';
      progressLabel.textContent = `Step ${step} of ${TOTAL_STEPS}`;
    }
  }

  /* ---------- Validation per step ---------- */
  function validateStep(step) {
    let valid = true;

    if (step === 1) {
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const mobile = document.getElementById('mobile');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = document.getElementById('terms');

      setHint('fullName', ''); setHint('email', ''); setHint('mobile', '');
      setHint('password', ''); setHint('confirmPassword', '');

      if (fullName.value.trim().length < 2) {
        setHint('fullName', 'Enter your full name.'); valid = false;
      }
      if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        setHint('email', 'Enter a valid email address.'); valid = false;
      }
      if (!/^\d{10}$/.test(mobile.value.trim())) {
        setHint('mobile', 'Enter a valid 10-digit mobile number.'); valid = false;
      }
      if (password.value.length < 8) {
        setHint('password', 'Password must be at least 8 characters.'); valid = false;
      }
      if (confirmPassword.value !== password.value || !confirmPassword.value) {
        setHint('confirmPassword', 'Passwords do not match.'); valid = false;
      }
      if (!terms.checked) {
        valid = false;
        terms.parentElement.style.outline = '2px solid #E24C4C';
        setTimeout(() => { terms.parentElement.style.outline = 'none'; }, 1200);
      }
      if (valid) document.getElementById('verifyEmailDisplay').textContent = email.value.trim();
    }

    if (step === 2) {
      const otp = document.getElementById('otp');
      setHint('otp', '');
      if (!/^\d{6}$/.test(otp.value.trim())) {
        setHint('otp', 'Enter the 6-digit code sent to your email.'); valid = false;
      }
    }

    if (step === 3) {
      const education = document.getElementById('education');
      setHint('education', '');
      if (!education.value) {
        setHint('education', 'Please select your education level.'); valid = false;
      }
    }

    if (step === 4) {
      setHint('goal', '');
      if (answers.goal.length === 0) { setHint('goal', 'Select a learning goal.'); valid = false; }
    }

    if (step === 5) {
      setHint('experience', '');
      if (answers.experience.length === 0) { setHint('experience', 'Select your experience level.'); valid = false; }
    }

    if (step === 6) {
      setHint('studyDays', '');
      if (answers.studyDays.length === 0) { setHint('studyDays', 'Select how many days you can study.'); valid = false; }
    }

    return valid;
  }

  /* ---------- Navigation ---------- */
  form.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!validateStep(currentStep)) {
        btn.closest('.step-pane').animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
          { duration: 260 }
        );
        return;
      }
      currentStep = Math.min(currentStep + 1, TOTAL_STEPS);
      showStep(currentStep);
    });
  });

  form.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep = Math.max(currentStep - 1, 1);
      showStep(currentStep);
    });
  });

  /* ---------- Finish: generate personalized roadmap ---------- */
  document.getElementById('finishBtn').addEventListener('click', () => {
    if (!validateStep(6)) { /* studyDays already validated at step 6 */ }
    generateRoadmap();
    showStep('success');
  });

  function generateRoadmap() {
    // Stub for personalized-roadmap generation.
    // In a full build this would POST `answers` + step-1 profile data
    // to the backend, which returns a tailored sequence of roadmap levels.
    const profile = {
      education: document.getElementById('education').value,
      goal: answers.goal[0] || null,
      experience: answers.experience[0] || null,
      studyDays: answers.studyDays[0] || null,
      studyHours: document.getElementById('studyHours').value,
      preferredTime: document.getElementById('preferredTime').value,
      interests: answers.interests,
      targetDate: document.getElementById('targetDate').value,
      examDate: document.getElementById('examDate').value,
    };
    try {
      sessionStorage.setItem('engineerhub_profile', JSON.stringify(profile));
    } catch (e) { /* storage unavailable — safe to ignore */ }
  }

  showStep(currentStep);
});
