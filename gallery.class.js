class Gallery {
    constructor(app) {
        this.app = app;
        this.offset = 0;
        this.loadAmount = 10;
        this.start();
    }

    start() {
        this.loadGifs();
        $(window).scroll(() => {
            $('.loader').addClass('d-none');
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && $('.loader').hasClass('d-none') && this.app.view == 2) {
                this.loadGifs();
            }
        });
    }

    loadGifs() {
        $('.loader').removeClass('d-none');
        $.get(`http://api.giphy.com/v1/gifs/trending?&api_key=B6oMkJ9rVPdPLr2l2W9DvpmrYMT4qP1d&limit=${this.loadAmount}&offset=${this.offset}`)
            .done((data) => {
                if (this.app.view == 2) {
                    let newImgs = this.getImgLink(data.data);
                    this.app.allImgs = [...this.app.allImgs, ...newImgs];
                    this.renderView(newImgs);
                } else if (this.app.direction == 'next') {
                    this.app.allImgs = [...this.app.allImgs, ...this.getImageLinks(data.data)];
                    $('.loader').addClass('d-none');
                } else if (this.app.direction == 'previous') {
                    this.app.allImgs = [...this.getImageLinks(data.data), ...this.app.allImgs];
                    $('.loader').addClass('d-none');
                }

            });

    };

    reloadImgs() {
        this.app.allImgs = [];
        this.offset = Math.floor(Math.random() * 3000);
        this.loadGifs();
    }


    renderView(arr) {
        $('.loader').removeClass('d-none');
        $('.reload').removeClass('d-none');
        arr = arr.map(x => {
            return `
            <div class="card border-0 mt-2 d-none img-holder">
            ${x}
            </div>
            `
        })
        $('.container .card-columns').append(arr);
        this.checkImages();
    }

    getImgLink(arr) {
        this.offset += arr.length;
        return arr.map(Obj => {
            return `
            <img src="${Obj.images.downsized.url}" alt="${Obj.title}" class="card-img-top img-fluid">
            `
        })
    }

    checkImages() {
        if ($('.img-holder').length > this.loadAmount) {
            $('.loader').addClass('d-none');
            $('.img-holder.d-none').removeClass('d-none');
        } else {

            let imgs = $('.img-holder.d-none').find('img'),
                imgLength = imgs.length,
                counter = 0;

            imgs.each((i, x) => {
                x.addEventListener('load', increaseAndCheck, false);
            });


            function increaseAndCheck() {
                counter++;

                if (counter == imgLength) {
                    $('.loader').addClass('d-none');
                    $('.img-holder.d-none').removeClass('d-none');
                }
            }


        }



    }

}