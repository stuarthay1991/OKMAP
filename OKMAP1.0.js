class OKMAP{
  constructor(target_div_id, column_names, doc, xscale, len, norm=1) 
  {
    this.target_div = target_div_id;
  	this.col_names = column_names;
  	this.SVG = "None";
  	this.SVG_main_group;
  	this.doc = doc;
    this.norm_flag = norm;
    this.tempRect = "";
    this.U_xscale = xscale;
    this.total_height = len;
  }
  
  baseSVG(w="100%", h="100%") 
  {
	this.SVG = d3.select("#".concat(this.target_div))
	  .append("svg")
		.attr("width", w)
		.attr("height", h)
    .attr("id", (this.target_div.concat("_svg")));

	this.SVG_main_group = this.SVG.append("g").attr("id", (this.target_div.concat("_group")));
		
	this.SVG_main_group.append("rect")
		.attr("width", w)
		.attr("height", h)
		.style("stroke", "White")
		.attr("type", "canvas")
		.attr("fill", "White");	

  //this.U_xscale
  //this.col_names

  }

  writeBase(yscale)
  {
    this.SVG_main_group.append("rect")
      .attr("width", (this.col_names.length * this.U_xscale))
      .attr("height", (this.total_height * yscale))
      .style("opacity", 0.0)
      .attr("fill", "Black"); 

  }

  writeHead(xscale, col_list)
  {
    var x_pointer = 0;

    for(var p = 0; p < col_list.length; p++)
    {
  		var mid_section = (x_pointer + (xscale/2.0));
  	    this.SVG_main_group.append("text")
  	        .attr("x", mid_section)
  	        .attr("y", 12)
  	        .attr("text-anchor", "middle")
  	        .style("font-size", "12px")
  	        .style('fill', 'black')
  	        .text(col_list[p]);
  		x_pointer = x_pointer + xscale;
	  }
  }

  writeSingle5(y_point, data, yscale, xscale, col_list, flag=0, hflag=0)
  {
  	var y_pointer = y_point;
  	var x_scale = xscale;
  	var y_scale = yscale;
  	var bubble_1 = d3.select("#".concat(this.target_div).concat("_group"));
  	var bubs = data;
  	//console.log(data);

    var x_pointer = 0;

    for(var p = 0; p < col_list.length; p++)
    {
      
      var rect_length = (1 * x_scale);
      var cur_square_val = parseFloat(data[col_list[p]]);
      var selected_color;
      if(cur_square_val < 0.6 && cur_square_val > 0.4)
      {
        selected_color = "rgb(0, 0, 0)";
      }
      if(cur_square_val < 0.5)
      {
            var convert_helper = 1 - cur_square_val;
            var magic_blue = (75 + (convert_helper * 125)).toString();
            var magic_others = (convert_helper * 25).toString();
            if((convert_helper * 25) < 128)
            {
              magic_others = 20;
            }
            selected_color = "rgb(".concat(magic_others).concat(", ").concat(magic_blue).concat(", ").concat(magic_blue).concat(")");
      }
      else
      {
            var magic_yellow = (12 + (cur_square_val * 125)).toString();
            var magic_yellow2 = (12 + (cur_square_val * 110)).toString();
            var magic_others = (cur_square_val * 5).toString();
            selected_color = "rgb(".concat(magic_yellow).concat(", ").concat(magic_yellow2).concat(", ").concat(magic_others).concat(")");
      }

    	this.SVG_main_group.append("rect")
          .style("stroke-width", 0)
    			.attr("x", x_pointer)
    			.attr("y", y_pointer)
  				.attr("width", rect_length)
  				.attr("height", y_scale)
  				.attr("fill", selected_color);
    		
      x_pointer = x_pointer + ((1 * x_scale) - 0.1);
    }


  }

  tempRectAdd(y_origin, col_list, xscale)
  {
    this.SVG_main_group.append("rect")
          .style("fill", "white")
          .style("stroke-width", 0)
          .style("opacity", 0.2)
          .attr("x", 0)
          .attr("y", y_origin.original.value)
          .attr("width", (col_list.length * xscale))
          .attr("height", y_origin.scale.value)
          .attr("id", "TEMPORARY_HIGHLIGHT");
  }

  tempRectRemove()
  {
    var rect_to_remove = document.getElementById("TEMPORARY_HIGHLIGHT");
    d3.select(rect_to_remove).remove();

  }  

  setSelected(id)
  {
    //document.getElementById(id).style.fill = "green";
    console.log(CURRENT_SELECTED_UID);

    var parent = this;

    var old_text = document.getElementById((CURRENT_SELECTED_UID.concat(this.target_div).concat("_id")));
    d3.select(old_text)
      .style('fill', 'black')
      .on("mouseover", function(){
            d3.select(this).style("fill", "red");
            parent.tempRectAdd(this.attributes, parent.col_names, parent.U_xscale);
      })
      .on("mouseout", function(){
            d3.select(this).style("fill", "black");
            parent.tempRectRemove();
      });     

    var cur_text = document.getElementById((id.concat(this.target_div).concat("_id")));
    d3.select(cur_text)
      .style('fill', 'green')
      .on("mouseover", function(){
            d3.select(this).style("fill", "green");
            parent.tempRectAdd(this.attributes, parent.col_names, parent.U_xscale);
      })
      .on("mouseout", function(){
            d3.select(this).style("fill", "green");
            parent.tempRectRemove();
      }); 

    CURRENT_SELECTED_UID = id;      

  }

  rowNormalization(row)
  {

  }

}