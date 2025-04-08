function openModal(title, date, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>${title}</h3>
            <p class="date">${date}</p>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => modal.remove();
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}