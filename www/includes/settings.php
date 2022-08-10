<div class="settings-div">
   <div id="print-settings-btn">
       <img src="resources/icons/cog.png" class="pointer lowopacity" />
   </div>

   <div id="settings-container">
       <div id="settings">
           <div id="hide-settings-btn">
               <img src="resources/icons/error-close.png" class="pointer lowopacity" />
           </div>

           <h2>Edit parameters</h2>

           <h3>Buttons</h3>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-live-btn" <?php echo ($settings['Print_live_btn'] == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Live button</span>
           <br>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-start-btn" <?php echo ($settings['Print_motion_start_btn'] == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Motion start/stop button</span>
           <br>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-autostart-btn" <?php echo ($settings['Print_motion_autostart_btn'] == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Motion autostart button</span>
           <br>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-alert-btn" <?php echo ($settings['Print_motion_alert_btn'] == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Motion alerts button</span>

           <h3>Motion statistics</h3>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-stats-btn" <?php echo ($settings['Print_motion_stats'] == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Print charts</span>

           <h3>Motion captures</h3>

           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-captures-btn" <?php echo ($settings['Print_motion_captures']  == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Print motion captures</span>

           <h3>Motion configuration</h3>
           <label class="onoff-switch-label">
               <input class="onoff-switch-input settings-param" type="checkbox" setting-name="print-motion-config-btn" <?php echo ($settings['Print_motion_config']  == 'yes') ? 'checked' : ''?>>
               <span class="onoff-switch-slider"></span>
           </label>
           <span>Print motion configuration files</span>
           
           <br>
           <br>

           <span id="save-settings-btn" class="btn-small-blue pointer">Save</span>
       </div>
   </div>
</div>