    <footer id="info">

      <?php if( is_front_page() ): ?>
        <p>more soon...maybe, meanwhile <a href="/share-your-story/">share</a> your own</p>
      <?php endif; ?>

      <a href="https://davehakkens.nl" class="by">A project by Dave Hakkens</a>

      <?php

      $args = [
        'container' => false,
        'theme_location' => 'social'
      ];

      wp_nav_menu( $args );

      ?>

    </footer>

    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="<?= get_stylesheet_directory_uri() ?>/js/fitvids.min.js"></script>

    <?php if( is_front_page() ): ?>
    <script src="<?= get_stylesheet_directory_uri() ?>/js/isotope.min.js"></script>
    <?php endif; ?>

    <script src="<?= get_stylesheet_directory_uri() ?>/js/core.js"></script>

    <?php wp_footer() ?>
  </body>
</html>
