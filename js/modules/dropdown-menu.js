import outsideClick from "./outsideclick.js";

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    // verifica se events não foi definido.
    if (events === undefined) {
      this.events = ["touchstart", "click"]; // Valor padrão caso não seja definido.
    } else {
      this.events = events; // caso queira trocar os events da função, é define na criação do objeto(classe).
    }

    this.activeClass = "active"; // <- caso queira trocar o nome da classe
    this.activeDropDownMenu = this.activeDropDownMenu.bind(this);
  }

  // ativa o dropdownMenu e adiciona a função que observa o click fora dele.
  activeDropDownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdown menu
  addDropDownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropDownMenu, { passive: true }); // "passive: true" = Você não vai cancelar o comportamento padrão ( com preventDefault()), então o navegador pode agir imediatamente, sem precisar esperar pelo código terminar a execução.
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropDownMenusEvent();
    }
    return this;
  }
}
