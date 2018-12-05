class App {
    constructor() {
        this.allImgs = [];
        this.view = 2;
        this.gallery = new Gallery(this);
        this.picture = new Picture(this);
        this.eventHandler();
        this.direction;
    }

    eventHandler() {
        $(document).on('click', '.img-holder', (e) => {
            let indexOfImg = $.inArray(e.target, $('img'));
            this.picture.start(indexOfImg);
            $('.reload').addClass('d-none');
        });

        $(document).on('click', '.reload', (e) => {
            e.preventDefault();
            $('main .card-columns').empty();
            $('main .picture-holder').empty();
            this.gallery.reloadImgs();
        });

        $(document).on('click', '.loadGallery', (e) => {
            e.preventDefault();
            $('main .picture-holder').empty();
            this.gallery.renderView(this.allImgs);
        })
    }




}