export const secondsToHms = (seconds) => {
  if (!seconds) return "00:00";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}s ${sec}s`;
  } else if (min === 0) {
    return `00:${sec}`;
  } else {
    return `${min}:${sec}`;
  }
};
export const removeActiveClasses = () => {
  document
    .querySelectorAll(".item")
    .forEach((dialog) => dialog.classList.remove("active"));
};
export const addActiveClass = (e) => {
  const dialogItem = e.target.closest(".item");
  removeActiveClasses();
  dialogItem.classList.add("active");
};
export const convertToSeconds = (minutes, seconds) => {
  return Number(minutes) * 60 + Number(seconds);
};
