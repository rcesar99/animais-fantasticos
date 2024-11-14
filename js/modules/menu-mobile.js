import outsideClick from "./outsideclick.js";

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.activeClass = "active";

    // verifica se os eventos não foi definido.
    if (events === undefined) {
      this.events = ["touchstart", "click"]; // Valor padrão caso não seja definido.
    } else {
      this.events = events; // caso queira trocar os events da função, é define na criação do objeto(classe).
    }

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.menuList.classList.add(this.activeClass);
    this.menuButton.classList.add(this.activeClass);
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove(this.activeClass);
      this.menuButton.classList.remove(this.activeClass);
    });
  }

  addMenuMobileEvents() {
    // "passive: true" = Você não vai cancelar o comportamento padrão ( com preventDefault()), então o navegador pode agir imediatamente, sem precisar esperar pelo código terminar a execução.
    this.events.forEach((evento) => this.menuButton.addEventListener(evento, this.openMenu, { passive: true }));
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
