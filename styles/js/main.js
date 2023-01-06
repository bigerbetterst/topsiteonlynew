$(function () {
	if(document.URL.includes("#donate")){
		$('html, body').animate({
			scrollTop: $("#donate").offset().top
		}, 1000);
	}
});


$("#Capa_1").click(function () {
	$('.buy-menu').fadeOut();
	$('body').css('overflow-y','auto');
});


/*CUSTOM CODE*/
var text_ip = $('.main-content-lider-content-left-button-text').text();
function copy_ip(el) {
		
		if($("*").is(".header-top-border-right-play-text")){
			$('.header-top-border-right-play-text').css('color', '#ffb200');
			$('.header-top-border-right-play-ico').addClass('active');
			setTimeout( function(){
				$('.header-top-border-right-play-ico').removeClass('active');
				$('.header-top-border-right-play-text').css('color', '');
			}, 3000);
		}
		
		var $tmp = $("<textarea>");
		$("body").append($tmp);
		$tmp.val($("."+el).text()).select();
		document.execCommand("copy");
		$tmp.remove();
		$(".copy-ip").css("background-image", "url(img/copy-ok.png)");
		Lobibox.notify('info', {
           delay: 5000,
		   title: 'Успешно скопировано',
           msg: $("."+el).text()+' - Скопировано'
        });
	}  



$(".shop-obj-left-buy-price").click(function () {
	$('.modal-form').css('display', 'none');
	$('.modal-shop').css('display', 'block');
	$('.modal').css('align-items', 'unset');
	$('body').css('overflow-y', 'hidden');
	$('.modal').fadeIn();
});

$(".qution_pass").click(function () {
	$(this).find('.qution_pass_text-hide').slideToggle();
	if($(this).find('.image-qution_pass').hasClass('active')){
		$(this).find('.image-qution_pass').removeClass('active');
	}else{
		$(this).find('.image-qution_pass').addClass('active');
	}
});

$(".block_buy_pass").mouseenter(function() {
	$(this).find('.block_buy_pass_element').css('display', 'none');
	$(this).find('.block_buy_pass_element-hide').css('display', 'flex');
})
.mouseleave(function(){                 
	$(this).find('.block_buy_pass_element').css('display', 'flex');
	$(this).find('.block_buy_pass_element-hide').css('display', 'none');
});

$(".download-header").click(function () {
	Lobibox.notify('error', {delay: 5000, title: "Данный раздел еще в разработке", msg: "Работа над лаунчером идет полным ходом"});
});



$(".auth-header").click(function () {
	$('.modal-site').fadeIn();
	$('.modal-auth').css('display', 'none');
	$('.auth_panel').css('display', 'flex');
	$('body').css('overflow-y', 'hidden');
});



$(".form-2bottom").click(function () {
	$('.modal-form').css('display', 'none');
	$('.'+$(this).attr('open_form')).fadeIn();
});

$(".modal_form_next-step").click(function () {
	$('.modal-form').css('display', 'none');
	$('.'+$(this).attr('open_form')).fadeIn();
});

//Открыть "Забыли пароль"
$(".auth-modal-notpassword").click(function () {
	$('.modal-auth').css('display', 'none');
	$('.unknow_email_form').fadeIn();
});

//Открыть "Регистрацию"
$(".register-modal-auth").click(function () {
	if($(this).hasClass('confirm_rep')){
		return;
	}
	
	$('.modal-auth').css('display', 'none');
	
	if($(this).hasClass('register')){
		$('.auth_panel').fadeIn();
		return;
	}
	
	$('.register_panel').fadeIn();
});

//Показать скрытый пароль
$(".hide_password").click(function () {
	
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).parent('.input-password').find('input').attr('type', 'password');
		return;
	}
	
	$(this).addClass('active');
	
	$(this).parent('.input-password').find('input').attr('type', 'text');
	
});

//Подтверждение почты
$(".confirm_mail").click(function () {
	if($('#confirm_1').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_1').addClass('error_input');
		setTimeout(function(){$('#confirm_1').removeClass('error_input');}, 2000);
		return;
	}
	if($('#confirm_2').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_2').addClass('error_input');
		setTimeout(function(){$('#confirm_2').removeClass('error_input');}, 2000);
		return;
	}
	if($('#confirm_3').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_3').addClass('error_input');
		setTimeout(function(){$('#confirm_3').removeClass('error_input');}, 2000);
		return;
	}
	if($('#confirm_4').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_4').addClass('error_input');
		setTimeout(function(){$('#confirm_4').removeClass('error_input');}, 2000);
		return;
	}
	if($('#confirm_5').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_5').addClass('error_input');
		setTimeout(function(){$('#confirm_5').removeClass('error_input');}, 2000);
		return;
	}
	if($('#confirm_6').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка ключа", msg: "ключ не полный!"});
		$('#confirm_6').addClass('error_input');
		setTimeout(function(){$('#confirm_6').removeClass('error_input');}, 2000);
		return;
	}
	
	var code = $('#confirm_1').val()+$('#confirm_2').val()+$('#confirm_3').val()+$('#confirm_4').val()+$('#confirm_5').val()+$('#confirm_6').val();
	var mail = $('.mail-confirm').text();
	
	$.post("/modules/auth/confirm_email.php", { 
		email: mail,  //Почта
		code: code//Код
	 })
	.done(function(data) {
		console.log(data);
		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
			}
			setTimeout(function(){location.reload();}, 2000);
		}
	});
	
});

host_name = location.hostname;

switch (host_name) {
  case "univix.ru":
	console.log("load");
    break;
  case "hesaymc.u-studio.su":
    console.log("load");
    break; 
  case "hesaymc.ru":
	console.log("load");
    break; 
  default:
}

//Повторно выслать код
cooldown_confirm_rep = 0;
$(".confirm_rep").click(function () {
	if(cooldown_confirm_rep == 1){
		Lobibox.notify('error', {
			delay: 5000,
			title: "Ошибка отправки",
			msg: "Вы сможете отправить повторный запрос тольчко через 10 секунд."
		});
		return;
	}
	var mail = $('.mail-confirm').text();
	$.post("/modules/auth/confirm_email_repeat.php", { 
		email: mail  //Почта
	 }).done(function(data) {
		console.log(data);
		cooldown_confirm_rep = 1;

		$('.confirm_rep').css('color', '#fc6666');
		$('.confirm_rep').css('text-decoration', 'none');
		$('.confirm_rep').css('cursor', 'default');
		
		setTimeout(function(){
			$('.confirm_rep').css('color', '');
			$('.confirm_rep').css('text-decoration', '');
			$('.confirm_rep').css('cursor', '');
			cooldown_confirm_rep = 0;
		}, 10000);
		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
			}
			
		}
	});
});
//Забыли пароль
$('.button-auth-reset-account').click(function () {
	//Если пустой email
	if($('#unknow_email').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления", msg: "Поле почты не может быть пустым!"});
		$('#unknow_email').addClass('error_input');
		setTimeout(function(){$('#unknow_email').removeClass('error_input');}, 2000);
		return;
	}
	//Если email некорректный
 	if(!isValidEmailAddress($('#unknow_email').val())){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления", msg: "Вы ввели некорректный почтовый адрес!"});
		$('#unknow_email').addClass('error_input');
		setTimeout(function(){$('#unknow_email').removeClass('error_input');}, 2000);
		return;
	}
	$.post("/modules/auth/reset_account.php", { 
		email: $('#unknow_email').val()  //Почта
	 })
	.done(function(data) {

		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		
		if(RQData.action == "successful"){
			Swal.fire(
			  RQData.swal_fire.title,
			  RQData.swal_fire.msg,
			  RQData.swal_fire.type
			);
		}
		
	});
});

$('.add_money').click(function() {
Swal.fire({
  title: 'Введите сумму для пополнения',
  input: 'number',
  inputAttributes: {
	autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Пополнить',
  cancelButtonText: 'Назад',
  showLoaderOnConfirm: true,
  preConfirm: (money) => {
	window.location.href = "lib/donate/buy.php?money="+money;
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
	  console.log(result);

  }
})
});

setInterval(function() {
	if ($(".universal-studio").length){
		if($(".universal-studio-text-1").text() != 'Дизайн и разработка' || $(".universal-studio-text-1").is(':hidden')){
		 // window.location.href = "https://u-studio.su";
		}
		if($(".universal-studio-text-2").text() != 'U-STUDIO.SU' || $(".universal-studio-text-2").is(':hidden')){
		 // window.location.href = "https://u-studio.su";
		}
		if($(".universal-studio").attr("href") != "https://u-studio.su" || $(".universal-studio").is(':hidden')){
		 // window.location.href = "https://u-studio.su";
		}
	}else{
		//window.location.href = "https://u-studio.su";
	}
}, 500);



//Смена пароля для восстановления аккаунта
$(".button-auth-reset_password_acc").click(function () {
	//Если сессия не была передана
	if(reset_session.length != 32){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Неправильная сессия, попробуйте запросить ссылку восстановления заново!"});
		$('#reset_password1').addClass('error_input');
		$('#reset_password2').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');$('#reset_password2').removeClass('error_input');}, 2000);
		return;
	}
	//Если почта не была передана
	if(reset_email.length < 1){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Неправильно переданные данные, попробуйте запросить ссылку восстановления заново!"});
		$('#reset_password1').addClass('error_input');
		$('#reset_password2').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');$('#reset_password2').removeClass('error_input');}, 2000);
		return;
	}
	//Если не введен пароль
 	if($('#reset_password1').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Поле пароля не может быть пустым!"});
		$('#reset_password1').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');}, 2000);
		return;
	}
	//Если длина пароля меньше 6 символов
	if($('#reset_password1').val().length < 6){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Пароль должен быть больше 5 символов!"});
		$('#reset_password1').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');}, 2000);
		return;
	}
	//Если в пароле есть пробел
	if(hasWhiteSpace($('#reset_password1').val())){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Пароль не должен содержать пробелов!"});
		$('#reset_password1').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');}, 2000);
		return;
	}
	//Если нет цифры
	if(!hasNumber($('#reset_password1').val())){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "В пароле должна быть как минимум 1 цифра!"});
		$('#reset_password1').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');}, 2000);
		return;
	}
	//Проверка пароля
	if($('#reset_password2').val() != $('#reset_password1').val()){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка восстановления аккаунта", msg: "Пароли не соответствуют друг другу!"});
		$('#reset_password1').addClass('error_input');
		$('#reset_password2').addClass('error_input');
		setTimeout(function(){$('#reset_password1').removeClass('error_input');$('#reset_password2').removeClass('error_input');}, 2000);
		return;
	}

	
	$.post("/modules/auth/reset_account_password.php", { 
		session: reset_session, //Логин
		email: reset_email,  //Почта
		password: $('#reset_password1').val(), //Пароль
		password2: $('#reset_password2').val() //Пароль 2
	 })
	.done(function(data) {
		
		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}

		if(RQData.action == "successful"){
			var data_content = RQData.swal_fire.type;
			if(data_content.length > 1){
				Swal.fire(
				  RQData.swal_fire.title,
				  RQData.swal_fire.msg,
				  RQData.swal_fire.type
				);
				$('.modal-site').fadeOut();
			}
		}
		
	});
	
});

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

payment_method = 'cd';
$(".payment-method-card").click(function () {
	$(".payment-method-card").removeClass('active');
	
	$(this).addClass('active');
	
	payment_method = $(this).attr('payment');
	if($(this).attr('payment') != 'cd'){
		$('.ico-payment-card').css('filter', 'invert(1)');
		$(this).css('margin-right', '0');
	}else{
		$('.ico-payment-card').css('filter', '');
	}
});

$(".payment-button").click(function () {
	//user_login
	var login = $('.user_login').val();
	var promocode = $('.user_promocode').val();
	var discord_id = $('.discord_id').val();
	
	if(login.length < 1){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка оплаты", msg: "Введите корректный логин!"});
		return;
	}
	
	if($('.user_login').hasClass('disabled')){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка оплаты", msg: "Войдите в ваш аккаунт discord!"});
		return;
	}
	
	if($(this).hasClass('not_join')){
		Lobibox.notify("warning", {
			delay: 15000,
			title: "Ошибка подтверждения",
			msg: "Вы должны быть подписаны на наш Discord сервер <a href='https://discord.com/invite/EtM8ksgxZf' class='link'>https://discord.com/invite/EtM8ksgxZf</a>. После того, как подпишитесь, обновите страницу!"
		});
		return;
	}
	
	window.location.href = "lib/donate/buy.php?login="+login+"&id=1"+"&promocode="+promocode+"&discord_id="+discord_id+"&method="+payment_method;
});

/*Promocode*/
  var $err_promo = [];
  var activate_promo = false;
  $('.user_promocode').keyup(function(){
	  var value = $('.user_promocode').val();
	  if($err_promo.indexOf(value) != -1){
		return;
	  }
	  if(activate_promo){
		  return;
	  }
	  if(value.length > 4){
		  var free = false;
		  $.post('/lib/donate/promocode.php', { promocode: value })
			.done(function(data) {
			var json_data = JSON.parse(data);
			json_data = json_data[0];
			if(json_data['active']){
				if(!activate_promo){
					console.log(json_data);
					
					//Начальная сумма
					const cell_sum = parseInt($('.payment-button-text-2').text().replace(/[^0-9]/g,""));
					
					var discount = (cell_sum * json_data['percent']) / 100;
					discount = Math.ceil(cell_sum - discount);
					
					if(discount < 1){
						var free = true;
					}
					
					
					$('.payment-button-text-2').text(discount+" ₽");
					if(free){
						$('.payment-button-text-2').text("");
						$('.payment-button-text-1').text("Получить пропуск");
					}
					
					var audio = new Audio(); // Создаём новый элемент Audio
					audio.src = '/sounds/promocode.mp3'; // Указываем путь к звуку "клика"
					audio.autoplay = true; // Автоматически запускаем
					
					$(".user_promocode").prop('disabled', true);
					$(".user_promocode").addClass('active');
					
					
					console.log(discount);
					
				}
				activate_promo = true;
			}else{
				$err_promo.push(json_data['promocode']);
			}
		  });
	  }
  });

//Регистрация
$(".button-auth-register").click(function () {
	var recaptcha = $(this).parent('.register').find('.g-recaptcha-response').val();
	//Если пустая капча
	if(recaptcha.length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка капчи", msg: "Подтвердите капчу!"});
		grecaptcha.reset();
		return;
	}
	//Если пустой логин
	if($('#register_login').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Поле логина не может быть пустым!"});
		$('#register_login').addClass('error_input');
		setTimeout(function(){$('#register_login').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если длина логина меньше 4 символов
	if($('#register_login').val().length < 4){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Длина логина должна быть больше 4 символов!"});
		$('#register_login').addClass('error_input');
		setTimeout(function(){$('#register_login').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если длина логина меньше 4 символов
	if($('#register_login').val().length > 16){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Логин не может быть больше 16 символов!"});
		$('#register_login').addClass('error_input');
		setTimeout(function(){$('#register_login').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если пустой email
	if($('#register_mail').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Поле почты не может быть пустым!"});
		$('#register_mail').addClass('error_input');
		setTimeout(function(){$('#register_mail').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если email некорректный
 	if(!isValidEmailAddress($('#register_mail').val())){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Вы ввели некорректный почтовый адрес!"});
		$('#register_mail').addClass('error_input');
		setTimeout(function(){$('#register_mail').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если не введен пароль
 	if($('#register_password1').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Поле пароля не может быть пустым!"});
		$('#register_password1').addClass('error_input');
		setTimeout(function(){$('#register_password1').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если длина пароля меньше 6 символов
	if($('#register_password1').val().length < 6){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Пароль должен быть больше 5 символов!"});
		$('#register_password1').addClass('error_input');
		setTimeout(function(){$('#register_password1').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Проверка пароля
	if($('#register_password2').val() != $('#register_password1').val()){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Пароли не соответствуют друг другу!"});
		$('#register_password1').addClass('error_input');
		$('#register_password2').addClass('error_input');
		setTimeout(function(){$('#register_password1').removeClass('error_input');$('#register_password2').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}

	$.post("/modules/auth/register.php", { 
		login: $('#register_login').val(), //Логин
		email: $('#register_mail').val(),  //Почта
		password: $('#register_password1').val(), //Пароль
		password2: $('#register_password2').val(), //Пароль 2
		recaptcha: recaptcha //Рекапча
	 })
	.done(function(data) {

		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		/*
		var data_content = RQData.swal_fire.type;
		if(data_content.length > 1){
			Swal.fire(
			  RQData.swal_fire.title,
			  RQData.swal_fire.msg,
			  RQData.swal_fire.type
			);
		}*/
		if(RQData.action == "successful"){
			$('.mail-confirm').text($('#register_mail').val());
			$('.modal-auth').css('display', 'none');
			$('.confirm_panel').fadeIn();
		}
		
		
		grecaptcha.reset();
		
	});
	

});

//Авторизация
$('.button_auth_trigger').click(function () {
	if($('#auth_login').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка авторизации", msg: "Поле логина не может быть пустым!"});
		$('#auth_login').addClass('error_input');
		setTimeout(function(){$('#auth_login').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	if($('#auth_login').val().length < 4){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка авторизации", msg: "Некорректный логин!"});
		$('#auth_login').addClass('error_input');
		setTimeout(function(){$('#auth_login').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если не введен пароль
 	if($('#auth_password').val().length == 0){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Поле пароля не может быть пустым!"});
		$('#auth_password').addClass('error_input');
		setTimeout(function(){$('#auth_password').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Если длина пароля меньше 6 символов
	if($('#auth_password').val().length < 6){
		Lobibox.notify('error', {delay: 5000, title: "Ошибка регистрации", msg: "Пароль должен быть больше 5 символов!"});
		$('#auth_password').addClass('error_input');
		setTimeout(function(){$('#auth_password').removeClass('error_input');}, 2000);
		grecaptcha.reset();
		return;
	}
	//Авторизация
	$.post("/modules/auth/login.php", { 
		login: $('#auth_login').val(), //Логин
		password: $('#auth_password').val()  //Почта
	 })
	.done(function(data) {

		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		
		if(RQData.action == "successful"){
			Swal.fire(
			  RQData.swal_fire.title,
			  RQData.swal_fire.msg,
			  RQData.swal_fire.type
			);
			setTimeout(function(){location.reload();}, 2000);
		}
		
	});
	
});

//Выход из аккаунта
$('.logout-account').click(function () {

	$.post("/modules/auth/logout.php", { 
		action: 'logout',
	 })
	.done(function(data) {

		var RQData = JSON.parse(data);
		var data_content = RQData.lobibox.type;
		if(data_content.length > 1){
			Lobibox.notify(RQData.lobibox.type, {
				delay: RQData.lobibox.delay,
				title: RQData.lobibox.title,
				msg: RQData.lobibox.msg
			});
		}
		
		if(RQData.action == "successful"){
			Swal.fire(
			  RQData.swal_fire.title,
			  RQData.swal_fire.msg,
			  RQData.swal_fire.type
			);
			setTimeout(function(){location.reload();}, 2000);
		}
		
	});
	
});

//Проверка логина
$('#register_login').bind('input', function(e){
	if($('#register_login').val().length >= 4){
		if($('#register_login').val().length < 17){
			$.post("/modules/auth/check_login.php", { 
				action: 'login', //Логин
				data: $('#register_login').val()
			 })
			.done(function(data) {
				if(data == 0){
					$('.login_register_text').fadeIn();
					$('#register_login').addClass('error_input');
				}else{
					$('.login_register_text').css('display', 'none');
					$('#register_login').removeClass('error_input');
				}
			});
		}else{
			$('.login_register_text').css('display', 'none');
			$('#register_login').removeClass('error_input');
		}
	}else{
		$('.login_register_text').css('display', 'none');
		$('#register_login').removeClass('error_input');
	}
});
//Проверка логина
$('#register_mail').bind('input', function(e){
	if($('#register_mail').val().length >= 4){
		if(isValidEmailAddress($('#register_mail').val())){
			console.log('true');
			$.post("/modules/auth/check_login.php", { 
				action: 'email', //Логин
				data: $('#register_mail').val()
			 })
			.done(function(data) {
				if(data == 0){
					$('.email_register_text').fadeIn();
					$('#register_mail').addClass('error_input');
				}else{
					$('.email_register_text').css('display', 'none');
					$('#register_mail').removeClass('error_input');
				}
			});
		}else{
			$('.email_register_text').css('display', 'none');
			$('#register_mail').removeClass('error_input');
		}
	}
});



//Ввод кода, для подтверждения email
$('.auth-comp-modal-confirm').bind('input', function(e){
	if($(this).val().length > 0){
		var int_inp = parseInt($(this).attr('int'));
			$(this).css('border', 'solid 1px #198a81');
		if(int_inp != 6){
			int_inp++;
		}
		$('#confirm_'+int_inp).focus();
	}else{
		var int_inp = parseInt($(this).attr('int'));
		$(this).css('border', '');
		if(int_inp != 1){
			int_inp--;
		}
		$('#confirm_'+int_inp).focus();
	}
	
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$('.modal-site').click(function(e){
	$('.modal-site').fadeOut();
	$('body').css('overflow-y', '');
	console.log(e);
}).children().click(function(e){e.stopPropagation();});


$(".absolute_close-main-form-4").click(function () {
	$('.modal').fadeOut();
	$('.modal').css('align-items', '');
	$('body').css('overflow-y', '');
});

	



$(".main_ham").click(function () {
	if($(this).attr('meta') != 'burger'){
		//$(this).toggleClass("open");
	}
});

$(".linka").click(function () {
	if($(this).hasClass('mobile')){
		$('.mobile-menu').fadeOut();
		$('.menu').removeClass('opened');
		$('body').css('overflow', '');
	}
	if($("#"+$(this).attr("scroll_to")).length < 1) {
		window.location.href = $("#domen").text()+"/"+$(this).attr("page");
		return false;
	}
		// существует
	
	$('html, body').animate({
        scrollTop: $("#"+$(this).attr("scroll_to")).offset().top
    }, 1000);
    return false;
});


function str_rand(count) {
		var result = '';
		var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_';
		var max_position = words.length - 1;
			for( i = 0; i < count; ++i ) {
				position = Math.floor ( Math.random() * max_position );
				result = result + words.substring(position, position + 1);
			}
		return result;
}
	  

function close_hum(){
	$('.buy-menu').fadeOut();
	$('.hanmt').removeClass('hanmtq');
	$('body').css('overflow-y','auto');
	setTimeout( function(){
		$('.menu').css("transform", 'translateX(100%)');
	}, 150);
	setTimeout( function(){
		ham_active = 0;
		$('.ham').removeClass('active');
		$('.hamburger-menu').fadeOut();
		$(this).css('position','');
		$(this).css('filter','');
		$(this).css('z-index','');
		$(this).css('margin-left','');
	}, 250);
}
function open_hum(){
	ham_active = 1;
	$('body').css('overflow-y','hidden');
	$('.hamburger-menu').fadeIn();
	setTimeout( function(){
		$('.menu').css("transform", 'translateX(0%)');
	}, 150);
	setTimeout( function(){
		$('.hanmt').addClass('hanmtq');
	}, 950);
}

var ham_active = 0;
$(".ham").click(function () {
	if(!ham_active){
		open_hum();
	}else{
		close_hum();
	}
});

$('.hamburger-menu').on('click', function(e) {
    if(e.target.id == 'hum'){
		close_hum();
	}
});

open_form = false;
$( window ).resize(function(){ // задаем функцию при срабатывании события "resize" на объекте window
	/*Фикс гамбургера*/
	var width = $( window ).width();// ширина области просмотра браузера
	if(width >= 786){
		close_hum();
	}
	if(open_form){
		$('body').css('overflow-y','hidden');
	}
});




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function update_MON(){
	$('.server-mon').each(function (index, value){
		

		mon_server_name = $(this).attr('value');
		
		if(!text_mon[mon_server_name]){
			text_mon[mon_server_name] = $(this).html();
		}

		if(mon_server_name){
			$.get( "/modules/monitoring/cache/"+mon_server_name+".json?v="+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000), function(){
			})
			.done(function(data) {
				console.log(data);
				percent = 0;
				$('.server-mon').each(function (index, value){
					if(data.server == $(this).attr('value')){
						percent = (data.online * 100) / data.max;
						//$(this).find(".info-server-i-1").text(data.online+" из");
						//$(this).find(".info-server-i-2").text(data.max);
						//$(this).find(".server-progress-active").css("width", percent+"%");
						
						$(this).text(data.online);
					}
				});
			})
			.fail(function() {
				console.log('false');
			});
		}
	});
	$.get( "/modules/monitoring/cache/globalOnline.json?v="+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000), function(){
	})
	.done(function(data) {
		$(".now-play").find(".white").text(data);
		$(".header-online-people").text(data);
	});
	$.get( "/modules/monitoring/cache/today_globalOnline.json?v="+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000), function(){
	})
	.done(function(data) {
		$(".top-play").find(".white").text(data);
	});
	$.get( "/modules/monitoring/cache/max_globalOnline.json?v="+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000)+getRandomInt(0, 500000), function(){
	})
	.done(function(data) {
		$(".only-top-play").find(".white").text(data);
	});
	
}

/*Мониторинг серов*/
var text_mon = [];
var global_online = 0;
var object_server = false;
if($("*").is(".servers-mon")){
	update_MON();
	setInterval(function(){
		update_MON();
		//$('.progress-absolution-id3').text(global_online+' игроков');
	}, 30000);
}

function buy_donate(){
	//console.log($("#domen").text()+"/lib/donate/buy.php?id="+$('#select_donate')[0].selectedIndex+"&name="+$("#name").val());
	if($("#name").val().length < 2){
		Lobibox.notify('warning', {
			delay: 5000,
			title: 'Ошибка ввода данных',
			msg: 'Вы не ввели свой логин'
		});
		return;
	}
	window.location.href = $("#domen").text()+"/lib/donate/buy.php?id="+$('#select_donate')[0].selectedIndex+"&user="+$("#name").val();
}



/*Мониторинг*/


$(".close-modal").on('click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation;
	
	var $this = $(this),
			modal = $($this).data("modal");
	
	$(modal).removeClass("open");
	setTimeout( function(){	
		$(modal).parents(".overlay").removeClass("open");
	}, 350);
	
});	


$(".close-modal").on('click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation;
	
	var $this = $(this),
			modal = $($this).data("modal");
	
	$(modal).removeClass("open");
	setTimeout( function(){	
		$(modal).parents(".overlay").removeClass("open");
	}, 350);
	
});	

var btn = $('#up');
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

function updatePage(links) {
	document.location.href = "/"+links;
}
$(".container").on('click', function(e){
	console.log($(this));
});	

var donate = window.location.hostname;
/*Всплывающие подсказки*/
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(function () {
    var IMG_PREFIX = 'demo/img/';
    (function () {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            iconSource: 'fontAwesome'
        });

        (function () {
            $('#basicDefaultCustomDelay').click(function () {
                Lobibox.notify('default', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicInfoCustomDelay').click(function () {
                Lobibox.notify('info', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningCustomDelay').click(function () {
                Lobibox.notify('warning', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorCustomDelay').click(function () {
                Lobibox.notify('error', {
                    delay: 5000,
                    title: "Ошибка авторизации",
                    msg: "Неправильный логин или пароль"
                });
            });
            $('#basicSuccessCustomDelay').click(function () {
                Lobibox.notify('success', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
    })();
});


$('body').on('click', '.group-sort-item', function() {
	$(this).parent().find('.sort-items').slideToggle();
});

$('body').on('click', '.sort-item-obj', function() {
	$(this).parent().parent().find('.sort-items').slideUp();
	var select_elem = $(this).text();
	$(this).parent().parent().find('.content-panel-left-text-2').text(select_elem);
	console.log(select_elem);
});


  


console.log("Модуль сайта загружен!");