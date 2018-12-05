class Picture {
    constructor(app) {
        this.app = app;
        this.indexOfImg;

    }

    start(indexOfImg) {
        this.app.view = 3;
        this.indexOfImg = indexOfImg;
        this.eventHandlers();
        $('main .card-columns').empty();
        this.render();
    }

    render() {
        $('main .picture-holder').append(`
        <div class="main-img row col-10 align-self-center px-4 mt-4"></div>
        <div class="row col-10 justify-content-between align-items-center mt-4 flex-nowrap p-0 mb-4 nextImgViewer border-top">
            <div class="left-img col-4 card p-2 p-md-3"></div>
            <button class="exit-to-gallery title="Go back to scrolling mode"><i class="fas fa-times"></i></button>
            <div class="right-img col-4 card p-2 p-md-3"></div>
        </div>
        `)
        $('.main-img').append(this.app.allImgs[this.indexOfImg]);
        $('.left-img').append(this.app.allImgs[this.indexOfImg - 1]);
        $('.right-img').append(this.app.allImgs[this.indexOfImg + 1]);
    }

    eventHandlers() {
        $(document).on('click', '.exit-to-gallery', () => {
            $('main .card-columns').empty();
            $('main .picture-holder').empty();
            this.app.view = 2;
            this.app.gallery.renderView(this.app.allImgs);
        });

        $(document).on('click', '.right-img', () => {
            if (!this.app.allImgs[this.indexOfImg + 2]) {
                this.app.direction = 'next';
                this.app.gallery.loadGifs();
            } else {
                this.indexOfImg++;
                $('.picture-holder').empty();
                this.render();
            }
        })

        $(document).on('click', '.left-img', () => {
            if (!this.app.allImgs[this.indexOfImg - 2]) {
                this.app.direction = 'previous';
                this.app.gallery.loadGifs();
                this.indexOfImg = 11;
            } else {
                this.indexOfImg--;
                $('.picture-holder').empty();
                this.render();
            }
        })
    }
}
