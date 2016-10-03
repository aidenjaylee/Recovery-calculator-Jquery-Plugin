/*
 *  jQuery Boilerplate - v3.3.4
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "cartReviverRoi",
				defaults = {
				propertyName: "value"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		Plugin.prototype = {

				init: function () {

					var opts = this.settings;

					var monthlyVisitEle = $(opts.monthlyVisitInput);
						monthlyVisitEle.change(recalc);

					var averageOrderEle = $(opts.averageOrderInput);
						averageOrderEle.change(recalc);

					var abandonmentRateEle = $(opts.abandonmentRateInput);
						abandonmentRateEle.change(recalc);

					// console.log(monthlyVisitEle, averageOrderEle, abandonmentRateEle);
					// Remove later

					function recalc(){
		                var monthlyVists = monthlyVisitEle.val();
		                var averageOrder = averageOrderEle.val();
		                var abandonmentRate = abandonmentRateEle.val();

		                $(document).find(".calc").remove();
		 
		                for(var recoverExampleIdx = 1; recoverExampleIdx < 5; recoverExampleIdx++) 
	        				{
		                        var line = calcLine(monthlyVists, averageOrder, abandonmentRate, recoverExampleIdx * 5);
		                        // http://stackoverflow.com/questions/171027/add-table-row-in-jquery
		                        $(document).find("tr:last").after( '<tr class="calc"><td style="text-align:center; vertical-align:middle">' + line.recoveryRate + '&#37;' + '</td><td style="text-align:center; vertical-align:middle">' + '&#36;'+ line.monthlyAmount +'</td><td style="text-align:center; vertical-align:middle">' +'&#36;' + line.annualAmount + '</td><td class="flex-direction-nav tick">' + '</td>')
	        				}
	        			addTick();
	        			addActive();
					};

					function calcLine(monthlyVists, averageOrder, abandonmentRate, recoveryRate) {
		                var valueOfAbandonment = monthlyVists * averageOrder * (abandonmentRate/100);
		                var amountRecovered = valueOfAbandonment * (recoveryRate/100);
		                return  {
		                                recoveryRate: recoveryRate,
		                                monthlyAmount: amountRecovered,
		                                annualAmount: amountRecovered * 12
		                        };
					};

					function addTick(){
						$(document).find("tr.calc:nth-child(3) td:nth-child(4)").append('<img src="http://www.cartreviver.com/wp-content/uploads/2014/09/tick-txt.png">');
						$(document).find("tr.calc:nth-child(4) td:nth-child(4)").append('<img src="http://www.cartreviver.com/wp-content/uploads/2014/09/tick-txt.png">');;
					};
					function addActive(){
						$(document).find("tr.calc:nth-child(3)").addClass('active');
						$(document).find("tr.calc:nth-child(4)").addClass('active');
					}
				}

		}

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );