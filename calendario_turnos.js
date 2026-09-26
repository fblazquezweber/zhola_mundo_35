const weekdayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const stateCycle = ['empty', 'work', 'rest'];
const stateLabels = {
  empty: 'Sin marcar',
  work: 'Trabajo',
  rest: 'Libre',
};
const storageKey = 'calendario-turnos-v1';

const currentMonthEl = document.getElementById('current-month');
const weekdaysEl = document.getElementById('weekdays');
const calendarGridEl = document.getElementById('calendar-grid');
const exportOutputEl = document.getElementById('export-output');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const clearMonthButton = document.getElementById('clear-month');
const exportMonthButton = document.getElementById('export-month');
const copyExportButton = document.getElementById('copy-export');

const today = new Date();
const viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
const storedAssignments = loadAssignments();

renderWeekdays();
renderCalendar();

prevMonthButton.addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  renderCalendar();
});

clearMonthButton.addEventListener('click', () => {
  const monthPrefix = getMonthPrefix(viewDate);
  const keysToDelete = Object.keys(storedAssignments).filter((key) => key.startsWith(monthPrefix));

  if (!keysToDelete.length) {
    return;
  }

  keysToDelete.forEach((key) => {
    delete storedAssignments[key];
  });
  persistAssignments();
  renderCalendar();
  exportOutputEl.value = '';
});

exportMonthButton.addEventListener('click', () => {
  exportOutputEl.value = buildMonthlySummary(viewDate);
});

copyExportButton.addEventListener('click', async () => {
  if (!exportOutputEl.value.trim()) {
    exportOutputEl.value = buildMonthlySummary(viewDate);
  }

  try {
    await navigator.clipboard.writeText(exportOutputEl.value);
    copyExportButton.textContent = 'Copiado';
    setTimeout(() => {
      copyExportButton.textContent = 'Copiar texto';
    }, 1200);
  } catch (_error) {
    copyExportButton.textContent = 'No se pudo copiar';
    setTimeout(() => {
      copyExportButton.textContent = 'Copiar texto';
    }, 1600);
  }
});

function renderWeekdays() {
  weekdaysEl.innerHTML = '';
  weekdayNames.forEach((weekday) => {
    const cell = document.createElement('div');
    cell.className = 'weekday';
    cell.textContent = weekday;
    weekdaysEl.appendChild(cell);
  });
}

function renderCalendar() {
  calendarGridEl.innerHTML = '';

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric',
  }).format(viewDate);

  currentMonthEl.textContent = capitalize(monthLabel);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingSpacers = (firstDay.getDay() + 6) % 7;

  for (let index = 0; index < leadingSpacers; index += 1) {
    const spacer = document.createElement('div');
    spacer.className = 'day-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    calendarGridEl.appendChild(spacer);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const dateKey = toDateKey(date);
    const state = storedAssignments[dateKey] || 'empty';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day-button';
    button.dataset.state = state;
    button.dataset.dateKey = dateKey;
    button.setAttribute('aria-label', `${formatLongDate(date)}. Estado: ${stateLabels[state]}. Pulsa para cambiar.`);

    if (isSameDate(date, today)) {
      button.classList.add('today');
    }

    button.innerHTML = `
      <span class="day-number">${day}</span>
      <span class="day-label">${stateLabels[state]}</span>
      <span class="day-helper">Clic para cambiar</span>
    `;

    button.addEventListener('click', () => {
      const nextState = getNextState(button.dataset.state);
      button.dataset.state = nextState;
      button.querySelector('.day-label').textContent = stateLabels[nextState];
      button.setAttribute('aria-label', `${formatLongDate(date)}. Estado: ${stateLabels[nextState]}. Pulsa para cambiar.`);

      if (nextState === 'empty') {
        delete storedAssignments[dateKey];
      } else {
        storedAssignments[dateKey] = nextState;
      }

      persistAssignments();
    });

    calendarGridEl.appendChild(button);
  }
}

function getNextState(currentState) {
  const currentIndex = stateCycle.indexOf(currentState);
  return stateCycle[(currentIndex + 1) % stateCycle.length];
}

function buildMonthlySummary(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const header = `Turnos de ${capitalize(new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date))}`;
  const lines = [header, ''];

  for (let day = 1; day <= lastDay; day += 1) {
    const currentDate = new Date(year, month, day);
    const key = toDateKey(currentDate);
    const state = storedAssignments[key] || 'empty';
    lines.push(`${formatLongDate(currentDate)}: ${stateLabels[state]}`);
  }

  return lines.join('\n');
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonthPrefix(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-`;
}

function formatLongDate(date) {
  return capitalize(new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date));
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function isSameDate(left, right) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function loadAssignments() {
  try {
    const rawValue = localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch (_error) {
    return {};
  }
}

function persistAssignments() {
  localStorage.setItem(storageKey, JSON.stringify(storedAssignments));
}
