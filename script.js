class ShootingStar {
    constructor(id = "body") {
        this.n = 0;
        this.m = 0;
        this.defaultOptions = {
            velocity: 8,
            starSize: 10,
            life: 300,
            beamSize: 400,
            dir: -1
        };
        this.options = {};
        this.capa = document.querySelector(id) || "body";
        this.wW = this.capa.offsetWidth;
        this.hW = this.capa.offsetHeight;
    }

    addBeamPart(x, y) {
        this.n++;
        const name = Math.floor(Math.random() * 100 + 1);
        const existingStar = document.querySelector(`#star${name}`);
        if (existingStar) existingStar.remove();

        this.capa.insertAdjacentHTML(
            "beforeend",
            `<div id="star${name}">
                <div id="haz${this.n}" class="haz" style="position: absolute; color: #FF0; width: 10px; height: 10px; font-weight: bold; font-size: ${this.options.starSize}px">·</div>
            </div>`
        );

        if (this.n > 1) {
            const prevHaz = document.querySelector(`#haz${this.n - 1}`);
            prevHaz.style.color = "rgba(255,255,255,0.5)";
        }

        const haz = document.querySelector(`#haz${this.n}`);
        haz.style.top = `${y + this.n}px`;
        haz.style.left = `${x + this.n * this.options.dir}px`;
    }

    delTrozoHaz() {
        this.m++;
        const haz = document.querySelector(`#haz${this.m}`);
        haz.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 75 });

        if (this.m >= this.options.beamSize) {
            const shootingStarParams = document.querySelector("#ShootingStarParams");
            shootingStarParams.style.display = "none";
        }
    }

    getRandom(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    launchStar(options = {}) {
        this.options = { ...this.defaultOptions, ...options };
        this.n = 0;
        this.m = 0;

        const x = this.getRandom(this.wW - this.options.beamSize - 100, 100);
        const y = this.getRandom(this.hW - this.options.beamSize - 100, 100);

        for (let i = 0; i < this.options.beamSize; i++) {
            setTimeout(() => {
                this.addBeamPart(x, y);
            }, this.options.life + i * this.options.velocity);
        }
    }
}
