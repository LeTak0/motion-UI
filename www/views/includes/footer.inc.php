<footer>
    <p>motion-UI - release version <?= VERSION ?></p>
    <br><br>    
    <a target="_blank" id="github" rel="noopener noreferrer" href="https://github.com/lbr38/motion-UI"><img src="resources/images/GitHub-Mark-Light-64px.png" /></a>
</footer>

<script src="resources/js/general.js"></script>
<script src="resources/js/userspace.js"></script>
<script src="resources/js/notification.js"></script>
<script src="resources/js/settings.js"></script>
<script src="resources/js/motion.js"></script>
<script src="resources/js/camera.js"></script>
<?php
if (__ACTUAL_URI__ == '/') : ?>
    <script src="resources/js/motion-charts.js"></script>
    <?php
endif ?>