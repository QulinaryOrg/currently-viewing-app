this["CurrentlyViewingApp"] = this["CurrentlyViewingApp"] || {};
this["CurrentlyViewingApp"]["templates"] = this["CurrentlyViewingApp"]["templates"] || {};

this["CurrentlyViewingApp"]["templates"]["ipListTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <tr>\n        <td>"
    + container.escapeExpression(((helper = (helper = helpers.ip || (depth0 != null ? depth0.ip : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"ip","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"table-responsive\">\n\n  <table class=\"table table-bordered table-striped\">\n    <thead>\n    <tr>\n      <th>IP</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n\n";
},"useData":true});