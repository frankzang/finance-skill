export const showAlertDialog = ({ title } = {}) => {
  const dialog = document.createElement('dialog');
  const dialogContent = `
    <h2></h2>
    <form method="dialog">
        <button autofocus>Fechar</button>
    </form>
  `;
  dialog.innerHTML = dialogContent;

  const dialogTitle = dialog.querySelector('h2');
  dialogTitle.innerText = title;

  dialog.addEventListener('close', () => {
    dialog.remove();
  });

  document.body.appendChild(dialog);

  dialog.showModal();
};
