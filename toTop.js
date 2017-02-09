jQuery(function()
{
    jQuery(window).on('scroll', function()
    {
        if (jQuery(window).scrollTop() > 100)
        {
            jQuery('.toTopWrapper').fadeIn();
        }
        else
        {
            jQuery('.toTopWrapper').fadeOut();
        }
    });
});
