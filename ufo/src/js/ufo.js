(function(){
	var ufoInf = {
		init : function(){
			ufoInf.animates();
			ufoInf.mesShow();
			$('#ufo_message').hide();
			$('.sharecontent').hide();
			$('#shareArrow').hide();
			$('#ufo_artical').hide();
			$('#arrow_air').hide();
		},
		animates : function(){
			$('#page0').addClass('animated bounceInLeft').css({"-webkit-animation-delay":"2.5s","-webkit-animation-duration":"2s"});
			setTimeout(function(){
				$('#page0').removeClass("bounceInLeft").removeAttr('style');
				$('#page0').addClass('pulse');
			},5000)
		},
		mesShow:function(){
			var con = "#星粉嘉年华#";
			$('#ufo_information').val(con);
			$('#ufo_information').on('keydown',function(){
				if ($('#ufo_information').val().length >= 140) {
					$('#ufo_information').val($('#ufo_information').val().substr(0,139)); 
					return false;
				}else{
					return true;
				}
			});
			$('#loveBtn').on('click',function(){
				$('#ufo_happy p').remove();
				$('#ufo_message').show();
				$('#arrow_air').show();
				$('#ufo_artical').show();
				$.ajax({
					type:'GET',
					url:'/family/confessions/list.json',
					dataType:'json',
					success:function(res){
						console.log(res.success);
						var userList = res.success, pcontent="",num=0,timer=null;
						timer=setInterval(function(){
							if(num>=userList.length-1){
								clearInterval(timer)
							}
							pcontent = '<span>'+userList[num].content.replace(/\?/g,"#")+'</span>';
							$('#ufo_happy').append(pcontent);
							setInterval(function(){
								$('#ufo_happy span').addClass('animated bounceOutUp')
							},0)
							num++;
						},5000)
					}
				});

				if($('#ufo_message').hasClass('sendMes')){
					var content = $('#ufo_information').val();
					console.log(content)
					$('#loveBtn').attr('disabled','true');
					setInterval(function(){
						$('#ufo_happy span').remove();
					},0)
					$.ajax({
						type:'POST',
						url:'/family/confessions.json',
						data:{'content':content},
						dataType:'json',
						success:function(res){
							if(res.success.message){
								$('#loveBtn').attr('disabled','false');
							}else{
								$('#loveBtn').attr('disabled','false');
							}
						}
					});
					$('#txtVal').text($('#ufo_information').val())[0];
					$('#txtVal').addClass('animated bounceInRight').css({"-webkit-animation-duration":"0.5s"});

					setTimeout(function(){
						$('#txtVal').removeClass('bounceInRight').removeAttr('style');
						$('#txtVal').addClass('fadeInUp').css({"-webkit-animation-duration":"5s"});
					},2000);

					setTimeout(function(){
						$('#txtVal').removeClass('animated fadeInUp');
						$('#txtVal').css({'opacity':'0'})
						$('.sharecontent').show();
					},7000);

					$('#shareMore img:nth-child(2)').on('click',function(){
						$('#shareMore').hide();
						$('#sharedFri').hide();
						$('#shareArrow').show();
						$('#mark').addClass('btnmark');
						if($('#mark').hasClass('btnmark')){
							$('#mark').on('click',function(){
								$('#mark').hide();
								$('#shareArrow').hide();
								window.location.href = location.href+'?time='+((new Date()).getTime());
							})
						}else{
							console.log(22)
						}
					})

				}else{

				}
				$('#ufo_message').addClass('sendMes');
			})
		}
	}
ufoInf.init()
})()