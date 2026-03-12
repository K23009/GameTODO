// 多分全体的にもう少し整理できる。

let title1;
let title2;
let join_title;
let user_name;
let user_name1;
let user_name2;

let color_picker_bg1;
let color_picker_bg2;
let color_picker_name;
let color_picker_other;
let name_input;
let title1_select;
let title2_select;
let join_title_select;

let bg1_color = "#ffffff";
let bg2_color = "#ff0";
let name_color = "#0ff";
let other_color = "#0f0";

let bg_pattern = document.getElementById("bg_id");

let bg_select = document.getElementById("bg_pattern");
bg_select.onchange = function () {
	console.log(bg_select.options[bg_select.selectedIndex].dataset.pattern);
	bg_pattern.value = bg_select.options[bg_select.selectedIndex].dataset.pattern;
	window.requestAnimationFrame(draw); 
}

event_add();

function draw() {
	const canvas = document.getElementById("my_card");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");

		if (user_name.length > 20) {
			user_name1 = user_name.substr(0, Math.round(user_name.length / 2));
			user_name2 = user_name.substr(Math.round(user_name.length / 2));
			user_name = "";
		}
		else {
			user_name1 = "";
			user_name2 = "";
		}

		ctx.fillStyle = bg1_color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		switch (bg_select.value) {
			case "bg_gra1":
				draw_gradient1(ctx, canvas);
				break;
			case "bg_gra2":
				draw_gradient2(ctx, canvas);
				break;
			case "bg_gra3":
				draw_gradient3(ctx, canvas);
				break;
			case "bg_gra4":
				draw_gradient4(ctx, canvas);
				break;
			case "bg_gra5":
				draw_gradient5(ctx, canvas);
				break;
			case "bg_gra6":
				draw_gradient6(ctx, canvas);
				break;
			case "bg_shima1":
				draw_shima1(ctx);
				break;
			case "bg_shima2":
				draw_shima2(ctx);
				break;
			case "bg_shima3":
				draw_shima3(ctx);
				break;
			case "bg_shima4":
				draw_shima4(ctx);
				break;
			case "bg_shima5":
				draw_shima5(ctx);
				break;
			case "bg_shima6":
				draw_shima6(ctx);
				break;
			case "bg_ichimatsu":
				draw_check1(ctx);
				break;
			case "bg_benkei":
				draw_check2(ctx);
				break;
			case "bg_miso":
				draw_check3(ctx);
				break;
			case "bg_koushi":
				draw_check4(ctx);
				break;
			case "bg_aziro":
				draw_check5(ctx);
				break;
			case "bg_yosuzi":
				draw_check6(ctx);
				break;
			case "bg_misuzi":
				draw_check8(ctx);
				break;
			case "bg_mimasu":
				draw_check9(ctx);
				break;
			case "bg_hutasuzi":
				draw_check7(ctx);
				break;
			case "bg_hishi":
				draw_hishigata(ctx);
				break;
			case "bg_dot":
				draw_dot(ctx, canvas);
				break;
			default:
				;// 何もしない。
		}


		ctx.fillStyle = other_color;
		ctx.textAlign = "start";
		ctx.font = "32px sans-serif";
		ctx.fillText(title1 + join_title + title2, 30, 70);

		ctx.font = "24px sans-serif";
		ctx.fillText("実績獲得数: " + achievement_data.completed, 30, 290);
		ctx.fillText("タスク完了数: " + achievement_data.task, 30, 330);
		ctx.fillText("称号獲得数: " + achievement_data.title, 300, 290);
		ctx.fillText("総獲得ポイント: " + achievement_data.total_point, 300, 330);

		ctx.fillStyle = name_color;
		ctx.font = "bold 64px sans-serif";
		ctx.textAlign = "right";
		ctx.fillText(user_name, 580, 200, 500);
		ctx.fillText(user_name1, 580, 160, 500);
		ctx.fillText(user_name2, 580, 220, 500);
	}
}

function bg1Update(event) {
	const canvas = document.getElementById("my_card");
	if (canvas.getContext) {
		bg1_color = event.target.value;
		window.requestAnimationFrame(draw);
	}
}

function bg2Update(event) {
	const canvas = document.getElementById("my_card");
	if (canvas.getContext) {
		bg2_color = event.target.value;
		window.requestAnimationFrame(draw);
	}
}

function nameUpdate(event) {
	const canvas = document.getElementById("my_card");
	if (canvas.getContext) {
		name_color = event.target.value;
		window.requestAnimationFrame(draw);
	}
}

function otherUpdate(event) {
	const canvas = document.getElementById("my_card");
	if (canvas.getContext) {
		other_color = event.target.value;
		window.requestAnimationFrame(draw);
	}
}

// 縦のグラデーション
function draw_gradient1(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

	gradient.addColorStop(0, "#fff0");
	gradient.addColorStop(1, bg2_color);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 横のグラデーション
function draw_gradient2(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

	gradient.addColorStop(0, "#fff0");
	gradient.addColorStop(1, bg2_color);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 斜め（右上）のグラデーション
function draw_gradient3(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);

	gradient.addColorStop(0, "#fff0");
	gradient.addColorStop(1, bg2_color);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 斜め（右下）のグラデーション
function draw_gradient4(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

	gradient.addColorStop(0, "#fff0");
	gradient.addColorStop(1, bg2_color);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 放射状のグラデーション
function draw_gradient5(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 300, canvas.width / 2, canvas.height / 2, canvas.width / 2);

	gradient.addColorStop(0, bg2_color);
	gradient.addColorStop(1, "#fff0");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 扇状のグラデーション
function draw_gradient6(ctx, canvas) {
	ctx.strokeStyle = bg2_color;
	let gradient = ctx.createConicGradient(0, canvas.width / 2, canvas.height / 2);
	//let gradient = ctx.createConicGradient(1.5 * Math.PI, canvas.width / 2, canvas.height / 2);

	gradient.addColorStop(0, "#fff0");
	gradient.addColorStop(1, bg2_color);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 横縞
function draw_shima1(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(0, check_size + (i * check_size * 2));
		ctx.lineTo(627, check_size + (i * check_size * 2));
	}
	ctx.stroke();
}

// 縦縞
function draw_shima2(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size / 2 + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size / 2 + (i * check_size * 2), 379);
	}
	ctx.stroke();
}

// 横斜め縞１
function draw_shima3(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(-check_size, - check_size * 3 + check_size + (i * check_size * 2));
		ctx.lineTo(627 + check_size, check_size + (i * check_size * 2) - check_size * 2);
	}
	ctx.stroke();
}

// 横斜め縞２
function draw_shima4(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(-check_size, check_size + (i * check_size * 2) - check_size * 2);
		ctx.lineTo(627 + check_size, check_size + (i * check_size * 2) - check_size * 3);
	}
	ctx.stroke();
}

// 縦斜め縞１
function draw_shima5(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size / 2 + (i * check_size * 2) - check_size * 3, - check_size / 2);
		ctx.lineTo(check_size / 2 + (i * check_size * 2), 379 + check_size);
	}
	ctx.stroke();
}

// 縦斜め縞２
function draw_shima6(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size / 2 + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size / 2 + (i * check_size * 2) - check_size * 3, 379 + check_size);
	}
	ctx.stroke();
}

// 市松格子
function draw_check1(ctx) {
	ctx.strokeStyle = bg2_color;
	let check_size = 40;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	ctx.setLineDash([check_size, check_size]);
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(0, check_size + (i * check_size * 2));
		ctx.lineTo(627, check_size + (i * check_size * 2));
	}
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size + check_size / 2 + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size + check_size / 2 + (i * check_size * 2), 379);
	}
	ctx.stroke();
	ctx.setLineDash([]);
}

// 弁慶縞
function draw_check2(ctx) {
	ctx.globalAlpha = 0.5;
	ctx.strokeStyle = bg2_color;

	let check_size = 48;
	ctx.lineWidth = check_size;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(0, check_size + (i * check_size * 2));
		ctx.lineTo(627, check_size + (i * check_size * 2));
	}
	ctx.stroke();
	ctx.beginPath();
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size + (i * check_size * 2), 379);
	}
	ctx.stroke();
	ctx.globalAlpha = 1.0;
}

// 味噌漉格子
function draw_check3(ctx) {
	ctx.strokeStyle = bg2_color;

	let check_size = 80;
	let line_width_thick = 10;
	let line_width_thin = 3;
	let line_margin = 20;
	ctx.lineWidth = line_width_thick;
	for (let i = 0; i < 9; i++) {
		ctx.beginPath();
		ctx.lineWidth = line_width_thick;
		ctx.moveTo(0, check_size / 4 + (i * check_size));
		ctx.lineTo(627, check_size / 4 + (i * check_size));
		ctx.stroke();
		ctx.lineWidth = line_width_thin;
		ctx.beginPath();
		for (let j = 0; j < 3; j++) {
			ctx.moveTo(0, check_size / 4 + (i * check_size) + ((j + 1) * line_margin));
			ctx.lineTo(627, check_size / 4 + (i * check_size) + ((j + 1) * line_margin));
		}
		ctx.stroke();
	}

	for (let i = 0; i < 20; i++) {
		ctx.beginPath();
		ctx.lineWidth = line_width_thick;
		ctx.moveTo(check_size / 4 + (i * check_size), 0);
		ctx.lineTo(check_size / 4 + (i * check_size), 379);
		ctx.stroke();
		ctx.lineWidth = line_width_thin;
		ctx.beginPath();
		for (let j = 0; j < 3; j++) {
			ctx.moveTo(check_size / 4 + (i * check_size) + ((j + 1) * line_margin), 0);
			ctx.lineTo(check_size / 4 + (i * check_size) + ((j + 1) * line_margin), 379);
		}
		ctx.stroke();
	}
}

// 格子
function draw_check4(ctx) {
	ctx.strokeStyle = bg2_color;

	let check_size = 32;
	ctx.lineWidth = 3;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(0, check_size + (i * check_size * 2));
		ctx.lineTo(627, check_size + (i * check_size * 2));
	}
	ctx.stroke();
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size + (i * check_size * 2), 379);
	}
	ctx.stroke();
}

// 網代組み・三崩し
function draw_check5(ctx) {
	ctx.strokeStyle = bg2_color;

	let check_size = 32;
	ctx.lineWidth = 6;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(0, check_size + (i * check_size * 2));
		ctx.lineTo(627, check_size + (i * check_size * 2));
	}
	for (let i = 0; i < 20; i++) {
		ctx.moveTo(check_size + (i * check_size * 2), - check_size / 2);
		ctx.lineTo(check_size + (i * check_size * 2), 379);
	}
	ctx.stroke();

	let dash_line_len = 62;
	let check_margin = 64;
	let line_margin = 20;
	ctx.setLineDash([dash_line_len, dash_line_len + 4]);

	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(dash_line_len / 2 + 2, 54 + (check_margin * i * 2) + (j * line_margin));
			ctx.lineTo(627, 54 + (check_margin * i * 2) + (j * line_margin));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(54 + (check_margin * i * 2) + (j * line_margin), -dash_line_len / 2);
			ctx.lineTo(54 + (check_margin * i * 2) + (j * line_margin), 379);
		}
	}
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(- dash_line_len / 2, -10 + (check_margin * i * 2) + (j * line_margin));
			ctx.lineTo(627, -10 + (check_margin * i * 2) + (j * line_margin));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(- 10 + (check_margin * i * 2) + (j * line_margin), check_margin / 2);
			ctx.lineTo(- 10 + (check_margin * i * 2) + (j * line_margin), 379);
		}
	}
	ctx.stroke();
	ctx.setLineDash([]);
}

// 四筋格子
function draw_check6(ctx) {
	ctx.strokeStyle = bg2_color;
	ctx.setLineDash([]);

	let check_size = 80;
	let line_width = 4;
	ctx.lineWidth = line_width;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 4; j++) {
			ctx.moveTo(0, check_size / 4 + (i * check_size) + (j * line_width * 2));
			ctx.lineTo(627, check_size / 4 + (i * check_size) + (j * line_width * 2));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 4; j++) {
			ctx.moveTo(check_size / 4 + (i * check_size) + (j * line_width * 2), 0);
			ctx.lineTo(check_size / 4 + (i * check_size) + (j * line_width * 2), 379);
		}
	}
	ctx.stroke();
}

// 二筋格子
function draw_check7(ctx) {
	ctx.strokeStyle = bg2_color;
	ctx.setLineDash([]);

	let check_size = 80;
	let line_width = 4;
	ctx.lineWidth = line_width;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(0, check_size / 2 + (i * check_size) + (j * line_width * 2));
			ctx.lineTo(627, check_size / 2 + (i * check_size) + (j * line_width * 2));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 0);
			ctx.lineTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 379);
		}
	}
	ctx.stroke();
}

// 三筋格子（予定）
function draw_check8(ctx) {
	ctx.strokeStyle = bg2_color;
	ctx.setLineDash([]);

	let check_size = 80;
	let line_width = 4;
	ctx.lineWidth = line_width;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(0, check_size / 2 + (i * check_size) + (j * line_width * 2));
			ctx.lineTo(627, check_size / 2 + (i * check_size) + (j * line_width * 2));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 0);
			ctx.lineTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 379);
		}
	}
	ctx.stroke();
}

// 三升格子（予定）
function draw_check9(ctx) {
	ctx.strokeStyle = bg2_color;
	ctx.setLineDash([]);

	let check_size = 80;
	let line_width = 4;
	ctx.lineWidth = line_width;
	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(0, check_size / 2 + (i * check_size) + (j * line_width * 2));
			ctx.lineTo(627, check_size / 2 + (i * check_size) + (j * line_width * 2));
		}
	}
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 2; j++) {
			ctx.moveTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 0);
			ctx.lineTo(check_size / 2 + (i * check_size) + (j * line_width * 2), 379);
		}
	}
	ctx.stroke();
}

// 菱形
function draw_hishigata(ctx) {
	ctx.strokeStyle = bg2_color;
	let line_width = 3;
	let line_margin = 40;
	ctx.lineWidth = line_width;

	ctx.beginPath();
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(-line_margin, (i * line_margin * 2));
		ctx.lineTo(627 + line_margin, (i * line_margin * 2) - line_margin * 6);
	}
	for (let i = 0; i < 9; i++) {
		ctx.moveTo(-line_margin, (i * line_margin * 2) - line_margin * 6);
		ctx.lineTo(627 + line_margin, (i * line_margin * 2));
	}
	ctx.stroke();
}

// ドット
function draw_dot(ctx) {
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 6; j++) {
			for (let k = 0; k < 10; k++) {
				ctx.beginPath();
				const x = (25 + i * 75) + k * 150; // x 座標
				const y = (25 + i * 75) + j * 150; // y 座標
				const radius = 8; // 円弧の半径
				const startAngle = 0; // 円孤の始点
				const endAngle = Math.PI * 2; // 円孤の終点

				ctx.arc(x, y, radius, startAngle, endAngle, true);

				ctx.fillStyle = bg2_color;
				ctx.fill();
			}
		}
	}
}

window.addEventListener("load", draw, false);

function mycard_download(event) {
	const canvas = document.getElementById("my_card");
	var mycard_img = canvas.toDataURL("image/png");
	const target = event.currentTarget;
	target.download = "my-card.png";
	target.href = mycard_img;
}

function event_add() {
	color_picker_bg1 = document.querySelector("#color_picker_bg1");
	bg1_color = color_picker_bg1.value;
	color_picker_bg1.addEventListener("input", bg1Update, false);
	color_picker_bg1.select();

	color_picker_bg2 = document.querySelector("#color_picker_bg2");
	bg2_color = color_picker_bg2.value;
	color_picker_bg2.addEventListener("input", bg2Update, false);

	color_picker_name = document.querySelector("#color_picker_name");
	name_color = color_picker_name.value;
	color_picker_name.addEventListener("input", nameUpdate, false);

	color_picker_other = document.querySelector("#color_picker_other");
	other_color = color_picker_other.value;
	color_picker_other.addEventListener("input", otherUpdate, false);

	name_input = document.querySelector("#user_name");
	user_name = name_input.value;
	name_input.addEventListener('input', () => {
		user_name = name_input.value;
		window.requestAnimationFrame(draw);
	});

	title1_select = document.querySelector("#title1_select");
	title1 = title1_select.options[title1_select.selectedIndex].innerHTML;
	title1_select.addEventListener('change', () => {
		title1 = title1_select.options[title1_select.selectedIndex].innerHTML;
		window.requestAnimationFrame(draw);
	});

	title2_select = document.querySelector("#title2_select");
	title2 = title2_select.options[title2_select.selectedIndex].innerHTML;
	title2_select.addEventListener('change', () => {
		title2 = title2_select.options[title2_select.selectedIndex].innerHTML;
		window.requestAnimationFrame(draw);
	});

	join_title_select = document.querySelector("#join_title_select");
	join_title = join_title_select.options[join_title_select.selectedIndex].innerHTML;
	join_title_select.addEventListener('change', () => {
		join_title = join_title_select.options[join_title_select.selectedIndex].innerHTML;
		window.requestAnimationFrame(draw);
	});

	for (let element of bg_select.options){
		console.log(element);
		if(bg_pattern.value == element.dataset.pattern){
			element.selected = true;
		}
	}
}