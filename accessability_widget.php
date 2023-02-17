<?php

namespace ProccessWire;

/**
 * Render the accessability widget on page
 * Render with Page::renderComponent
 * */
?>
<div class="accessability-widget-container hide" id="accessability-widget">
  <button class="accessability-button-close button flag-anchored close" id="accessability-button-close">
    close
  </button>
  <div class="block-container">
    <div class="content-block min">
      <div class="block-titles">
        <h2 id="accessability-options">
          Accessibility Options
        </h2>
      </div> <!-- /.block-titles -->
      <div class="content-group">
        <div class="radio-group">
          <input type="radio" name="letter" value="base-text" id="letter-base" checked></input>
          <label for="letter-base" class="change-size-button button base">
            <?= $page->renderSvg('icon_letter_a.svg'); ?>
          </label>


          <input type="radio" name="letter" value="medium-text" id="letter-md"></input>
          <label for="letter-md" class="change-size-button button md">
            <?= $page->renderSvg('icon_letter_a.svg'); ?>
          </label>

          <input type="radio" name="letter" value="large-text" id="letter-lg"></input>
          <label for="letter-lg" class="change-size-button button lg">
            <?= $page->renderSvg('icon_letter_a.svg'); ?>
          </label>
        </div> <!-- /.radio-group -->
        <h3>
          Content Size
        </h3>
      </div> <!-- /.content-group -->
      <div class="content-group ">
        <div class="radio-group cursor">

          <input type="radio" name="cursor" value="base-cursor" id="cursor-base" checked></input>
          <label for="cursor-base" class="change-size-button button base">
            <?= $page->renderSvg('icon_cursor.svg'); ?>
          </label>


          <input type="radio" name="cursor" value="medium-cursor" id="cursor-md"></input>
          <label for="cursor-md" class="change-size-button button md">
            <?= $page->renderSvg('icon_cursor.svg'); ?>
          </label>


          <input type="radio" name="cursor" value="large-cursor" id="cursor-lg">
          </label>
          <label for="cursor-lg" class="change-size-button button lg">
            <?= $page->renderSvg('icon_cursor.svg'); ?>
            </input>
        </div> <!-- /.radio-group -->
        <h3>
          Cursor Size
        </h3>
      </div> <!-- /.content-group -->
      <button class=" accessability-button-reset button" id="accessability-button-reset">
        Reset
      </button>
    </div> <!-- /.content-block-min -->
  </div>

  <!-- /.block-container -->
</div> <!-- /.widget_container -->

<button class="accessability-button" id="accessability-button">
  <?= $page->renderSvg('icon_accessibility.svg'); ?>
</button>