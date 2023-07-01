# **Custom Select**

A jquery form design plugin that customizes form inputs such as:

-   input (floating labels)
-   select (single/multiple)

## **How to use**

Import the files to your html header

```html
<head>
	<!-- Fontawesome (required for icon) -->
	<link rel="stylesheet" href="/path/to/fontawesome.min.css" />

	<!-- Bootstrap 5 (optional) -->
	<link rel="stylesheet" href="/path/to/bootstrap.min.css" />

	<!-- Custom Select CSS (required) -->
	<link rel="stylesheet" href="custom-select.css" />

	<!-- Jquery (required) -->
	<script src="/path/to/jquery.js"></script>

	<!-- Custom Select JS (required) -->
	<!-- Make sure it is below jquery -->
	<script defer src="custom-select.js"></script>
</head>
```

### **Single Select Input**

Syntax for using custom select. In here you can modify:

-   Caret icon
-   Search icon
-   Remove search container and not have search functionality

**NOTE:**

-   It is important to use the custom tagnames for it to be recognized in the script
-   A value is required

```html
<cselect id="ExampleId" single>
	<cselect-head>
		<label></label>
		<section>
			<input readonly type="text" placeholder="" />
			<i class="fa fa-solid fa-caret-down"></i>
		</section>
	</cselect-head>
	<cselect-options>
		<search-container>
			<input type="text" searchfield placeholder="Search" />
			<i class="fa fa-solid fa-search"></i>
		</search-container>
		<coption value=""></coption>
		...
	</cselect-options>
</cselect>
```

### **Floating Dropdown**

- Simply add the class `float` to the `<cselect-options>` tag

```html
<cselect id="ExampleId" single>
	<cselect-head>
		<label></label>
		<section>
			<input readonly type="text" placeholder="" />
			<i class="fa fa-solid fa-caret-down"></i>
		</section>
	</cselect-head>
	<cselect-options class="float">
		<search-container>
			<input type="text" searchfield placeholder="Search" />
			<i class="fa fa-solid fa-search"></i>
		</search-container>
		<coption value=""></coption>
		...
	</cselect-options>
</cselect>
```

### **Custom Form Inputs**

Use the class `cform-input` to `input` type elements. Labels here are not required

```html
<div class="col-sm-12">
	<label for="BirthDay">Birth Day</label>
	<input id="BirthDay" class="cform-input" type="date" />
</div>
```

For **floating labels only**, wrap them in a div with a class `floating-cform-label`.
Note that `<label>` is required.

```html
<div class="floating-cform-label">
	<label for="Sample"></label>
	<input id="Sample" class="cform-input" type="date" />
</div>
```

For **floating labels on input type fields**, wrap them in a div with a class `floating-cform-input`.
Note that `<label>` is required.

```html
<div class="floating-cform-input">
	<input id="FullName" class="cform-input" type="text" />
	<label for="FullName">Full Name</label>
</div>
```

### **Eventlisteners**

To get the value of the single select input. It is required to put the `setTimeout()` function.

```js
// sample onchange event on cselect
$(`#SingleSelectExample1`).change(function () {
	setTimeout(() => {
		console.log($(this).attr("value"));
	}, 100);
});
```
