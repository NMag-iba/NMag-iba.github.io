document.getElementById("nextSlide").addEventListener("click", function () {
    let carousel = new bootstrap.Carousel(document.getElementById("carouselExampleAutoplaying"));
    carousel.next();
});