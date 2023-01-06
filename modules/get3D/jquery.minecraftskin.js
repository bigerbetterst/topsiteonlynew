(function($) {
	var pluginName = 'minecraftSkin';

	var img = null;
    var methods =
    { init: function(options) {
      return this.each(function () {
        var $this = $(this)
          , data = $this.data(pluginName)
          , settings = {}

        // If the plugin hasn't been initialized yet
        if (!data) {
          settings =
            { scale: 6
            , hat: false
            , draw : 'model'
			, action : $this.data('minecraft-action')
            }
		  
		  
          if(options) $.extend(true, settings, options)
        }

        settings.username = $this.data('minecraft-username')
		settings.action = $this.data('minecraft-action')
		settings.status = $this.data('minecraft-status')
		
		if($this.attr("data-minecraft-status") == 'success'){
			return;
		}
		
		if(!$this.data('minecraft-status')){
			$this.attr("data-minecraft-status", 'success');
		}
		

        if ($this.data('minecraft-scale')) settings.scale = $this.data('minecraft-scale')
        if ($this.data('minecraft-draw')) settings.draw = $this.data('minecraft-draw')

        // Check if valid drawing set
        if (settings.draw !== 'head' && settings.draw !== 'model') settings.draw = 'model'

        // Request the data
        methods.requestData(settings.username, $this, settings)
      })
    }
    , buildImage: function(imgData, $this, settings) {
      // Failed to respond
      if(!imgData) return

      // Create the canvas
      var canvas = document.createElement('canvas')
        , scratchCanv = document.createElement('canvas')
        , model = canvas.getContext('2d')
        , scratch = scratchCanv.getContext('2d')
        , skin = new Image()
		, action = settings.action
		, status = settings.status
        , heightMultiplier = settings.draw === 'head' ? 17.6 : 44.8

      canvas.setAttribute('class', 'model')
      // Resize Scratch
	  console.log(action);
      //scratchCanv.setAttribute('width', 64 * settings.scale)
      //scratchCanv.setAttribute('height', 32 * settings.scale)
      //scratchCanv.setAttribute('class', 'scratch')

      // Resize Isometric Area (Found by trial and error)
      canvas.setAttribute('width', 20 * settings.scale)
      canvas.setAttribute('height', heightMultiplier * settings.scale)
	  
	  if(action == 2){
		  canvas.setAttribute('class', "action_2")
	  }

      $this.append(canvas)
      //$this.append(scratchCanv)
	  skin.action = action;
      skin.onload = function () {
      scratch.drawImage(skin, 0, 0, 64, 32, 0, 0, 64, 32)
		
        // Scale it
        scaleImage(scratch.getImageData(0, 0, 64, 32), scratch, 0, 0, settings.scale)

        // Draw the skin
        if(settings.draw === 'model') {
          methods.drawModel(model, scratchCanv, scratch, settings.hat, settings.scale, action)
        } else {
          methods.drawHead(model, scratchCanv, scratch, settings.hat, settings.scale, action)
        }
      }

      skin.src = imgData
    }
    , requestData: function(username, $this, settings) {
		$.get( "/modules/skin/skin.php?skin="+settings.username, function( data ) {
			console.log("/modules/skin/skin.php?skin="+settings.username);
			$this.find('.donut').css('display', 'none');
			methods.buildImage(data, $this, settings);
		});
      }
    , drawHead: function (model, scratchCanv, scratch, showHat, scale, action) {
		if(action == 2){
			var scaleEight = 8 * scale
			// Head - Front
        model.setTransform(1, 0, 0, 1, 0, 0)
        model.drawImage
          ( scratchCanv
          , scaleEight
          , scaleEight
          , scaleEight
          , scaleEight
          , 10 * scale
          , 13/1.2 * scale
          , scaleEight
          , scaleEight
          )

      }
	  if(action == 1){
		  
			var scaleEight = 8 * scale
			
			// Head - Front
			model.setTransform(1, -0.51, 0, 1.2, 0, 0)
			model.drawImage
			  ( scratchCanv
			  , scaleEight
			  , scaleEight
			  , scaleEight
			  , scaleEight
			  , 10 * scale
			  , 13/1.2 * scale
			  , scaleEight
			  , scaleEight
			  )

			// Head - Right
			model.setTransform(1.07, 0.5, 0, 1.2, 0, 0)
			model.drawImage
			  ( scratchCanv
			  , 0
			  , scaleEight
			  , scaleEight
			  , scaleEight
			  , 2 * scale
			  , 3/1.2 * scale
			  , scaleEight
			  , scaleEight
			  )

			// Head - Top
			model.setTransform(-1, 0.5, 1, 0.5, 0, 0)
			model.scale(-1, 1)
			model.drawImage
			  ( scratchCanv
			  , scaleEight
			  , 0
			  , scaleEight
			  , scaleEight
			  , -3 * scale
			  , 5 * scale
			  , scaleEight
			  , scaleEight
			  )

			if (!showHat) return

			// Hat - Front
			model.setTransform(1, -0.5, 0, 1.2, 0, 0)
			model.drawImage
			  ( scratchCanv
			  , 40 * scale
			  , scaleEight
			  , scaleEight
			  , scaleEight
			  , 10 * scale
			  , 13/1.2 * scale
			  , scaleEight
			  , scaleEight
			  )

			// Hat - Right
			model.setTransform(1, 0.5, 0, 1.2, 0, 0)
			model.drawImage
			  ( scratchCanv
			  , 32 * scale
			  , scaleEight
			  , scaleEight
			  , scaleEight
			  , 2 * scale
			  , 3/1.2 * scale
			  , scaleEight
			  , scaleEight
			  )

			// Hat - Top
			model.setTransform(-1, 0.5, 1, 0.5, 0, 0)
			model.scale(-1, 1)
			model.drawImage
			  ( scratchCanv
			  , 40 * scale
			  , 0
			  , scaleEight
			  , scaleEight
			  , -3 * scale
			  , 5 * scale
			  , scaleEight
			  , scaleEight
			  )
      }
	}
    , drawModel: function(model, scratchCanv, scratch, showHat, scale, action) {
        var scaleEight = 8 * scale


        methods.drawHead(model, scratchCanv, scratch, showHat, scale, action)
      }

  }

  //Scales using nearest neighbour
  function scaleImage(imageData, context, dx, dy, scale) {
    var width = imageData.width
      , height = imageData.height

    context.clearRect(0, 0, width, height) //Clear the spot where it originated from

    for (var y = 0; y < height; y++) { // Height original
      for (var x = 0; x < width; x++) { // Width original
        // Gets original colour, then makes a scaled square of the same colour
        var index = (x + y * width) * 4
          , fill = imageData.data[index]

        fill += ',' + imageData.data[index + 1] + ',' + imageData.data[index + 2] + ',' + imageData.data[index + 3]

        context.fillStyle = 'rgba(' + fill + ')'
        context.fillRect(dx + x * scale, dy + y * scale, scale, scale)
      }
    }
  }

  $.fn[pluginName] = function( method ) {
    if (methods[method]) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('Method ' + method + ' does not exist in jQuery.' + pluginName)
    }
  }
})( jQuery )
