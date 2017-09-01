<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <title>Kirby Panel</title>

  <link rel="stylesheet" href="./assets/css/panel.css">

</head>
<body>

  <main>
    <kirby-panel assets="./assets" api="http://localhost/kirby/v3/kirby"></kirby-panel>
  </main>

  <script>
    var panel = {
      config: {
        api: './kirby/',
        assets: './assets'
      }
    };
  </script>
  <script src="./assets/js/panel.js"></script>

</body>
</html>
