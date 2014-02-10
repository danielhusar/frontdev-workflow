<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1">

  {% include "base/_variables.tpl" %}

  <link rel="canonical" href="#">
  <title>{% block title %}Bootstrap{% endblock %}</title>
  <link rel="stylesheet" href="css/style.{% if isProduction %}min.{% endif %}css">

  <!--
    facebook sharing meta tags
    fill the url
  -->
  <meta property="og:title" content="">
  <meta property="og:description" content="" >
  <meta property="og:image" content="img/favicons/logo.png">
  <meta property="og:url" content="">
  <meta property="og:site_name" content="">

  <!--
    twitter card
    Twitter requires that your domain must be approved before they will allow Twitter Cards for your site;
    go to: https://dev.twitter.com/cards
    fill the url
  -->
  <meta name="twitter:card" content="">
  <meta name="twitter:url" content="">
  <meta name="twitter:title" content="">
  <meta name="twitter:description" content="">
  <meta name="twitter:image" content="img/favicons/logo.png">

  <!-- fill the canonical url -->
  <link rel="canonical" href="#">

  <!-- assets -->
  <link rel="stylesheet" href="css/style.{% if isProduction %}min.{% endif %}css">

  <!--[if (lt IE 9)&(!IEMobile)]>
    <link rel="stylesheet" href="css/IE.{% if isProduction %}min.{% endif %}css">
  <![endif]-->

  <script src="js/libraries/modernizr-2.7.1.min.js"></script>
</head>
<body id="page-{{ pageId }}">
  <!--[if lt IE 8]>
      <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
  <![endif]-->
  <div id="wrap">
    {% include "modules/header/_header.tpl" %}
    <main role="main" class="main clearfix">
      <div class="center">
        {% block content %}{% endblock %}
      </div>
    </main>
  </div>
  {% include "modules/footer/_footer.tpl" %}

  <script src="js/libraries/jquery.1.11.0.min.js"></script>
  {% if isProduction %}
    <script src="js/plugins.min.js"></script>
    <script src="js/app.min.js"></script>
  {% else %}
    <!-- polyfills -->
    <script src="js/libraries/polyfills.js"></script>

    <!-- plugins -->
    <script src="js/plugins/jQuery.lazyLoad.js"></script>

    <!-- core -->
    <script src="js/app/global.js"></script>
    <script src="js/app/settings.js"></script>
    <script src="js/app/promises.js"></script>
    <script src="js/app/events.js"></script>
    <!-- yeoman slug -->

    <!-- main init -->
    <script src="js/app/init.js"></script>
  {% endif %}

</body>
</html>