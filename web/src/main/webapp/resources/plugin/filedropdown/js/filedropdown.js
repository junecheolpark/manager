// form 이름
let _fileForm = 'frm';
// 첨부 폴더 설정
let _fileFolder = 'uploadfile';
// 파일 리스트 번호
let _fileIdx = 0;
// 등록할 전체 파일 사이즈
let _totalFileSize = 0;
// 파일 리스트
let _fileList = new Array();
// 파일 사이즈 리스트
let _fileSizeList = new Array();
// 등록 가능한 파일 사이즈 MB
let _uploadSize = 500;
// 등록 가능한 총 파일 사이즈 MB
let _maxUploadSize = 500;
// 등록 가능한 확장자 (등록 가능한 확장자가 없으면 등록 불가능한 확장자를 제외한 나머지 확장자는 업로드 가능)
let _arrFileExt = [];
// 등록 불가능한 확장자
let _arrFileNotExt = ['exe', 'bat', 'sh', 'java', 'jsp', 'asp', 'aspx', 'php', 'html', 'js', 'css', 'xml'];
// 파일 삭제 버튼
let _fileDelBtn = '<img src="/resources/plugin/filedropdown/images/btn_rowdel.png" alt="삭제" />';
// 파일 상태 : data-status
let _arrFileStatus = ['대기', '정상', '실패']; //1:대기,2:정상,3:실패

// 파일 드롭 다운
function fnRyUploader(pID) {
	const obj = $('#' + pID);

	obj.on('dragenter', function(e) {
		// 드래그 가능한 요소가 대상 위로 오면 강조
		e.stopPropagation();
		e.preventDefault();

		obj.css('background-color', '#eeeef7');
	});

	obj.on('dragleave', function(e) {
		// 드래그 가능한 요소가 대상 밖으로 나가면 강조 제거
		e.stopPropagation();
		e.preventDefault();

		obj.css('background-color', '#ffffff');
	});

	obj.on('dragover', function(e) {
		// 드롭을 허용하기 위해 기본 동작 취소
		e.stopPropagation();
		e.preventDefault();

		obj.css('background-color', '#eeeef7');
	});

	obj.on('drop', function(e) {
		e.preventDefault();

		obj.css('background-color', '#ffffff');

		const files = e.originalEvent.dataTransfer.files;
		if (files != null) {
			if (files.length < 1) {
				alert('폴더는 업로드 할 수 없습니다.');
				return;
			}
			fnRyUploaderAddFile(pID, files);
		} else {
			alert('error');
		}
	});

	// 파일 선택
	fnRyUploaderSelFile(pID);
}

// 파일 선택
function fnRyUploaderSelFile(pID) {
	const obj = $('#ry_file');

	obj.change(function(e) {
		e.preventDefault();

		const files = this.files;

		if (files != null) {
			if (files.length < 1) {
				alert('폴더는 업로드 할 수 없습니다.');
				return;
			}
			fnRyUploaderAddFile(pID, files);
			obj.val('');
		} else {
			alert('error');
		}
	});
}

// 파일 추가
function fnRyUploaderAddFile(pID, files) {
	// 다중파일 등록
	// 파일 이름
	let fileName = '';
	let arrFileName = [];
	// 확장자
	let ext = '';
	// 파일 사이즈(단위 :MB)
	let fileSize = 0;
	let strFileSize = '';
	// 업로드 확장차 확인
	let chkExt = true;

	if (files != null) {
		for (var i = 0; files.length > i; i++) {
			fileName = files[i].name;
			arrFileName = fileName.split('\.');
			ext = arrFileName[arrFileName.length - 1];
			ext = ext.toLocaleLowerCase();
			fileSize = files[i].size / 1024 / 1024;
			chkExt = true;

			if ($.inArray(ext, _arrFileNotExt) >= 0) { // 확장자 체크
				if (_arrFileExt.length > 0) {
					if ($.inArray(ext, _arrFileExt) < 0) chkExt = false;
				} else {
					chkExt = false;
				}
				if (!chkExt) alert('업로드 할 수 없는 확장자 입니다.\n\n이미지, 문서, 압축파일을 업로드해 주세요.');
				break;
			} else if (fileSize > _uploadSize) {// 파일 사이즈 체크                
				alert('업로드 가능한 용량을 초과 했습니다.\n\n파일별 업로드 가능 용량 : ' + _uploadSize + ' MB');
				break;
			} else {
				if (files[i].size >= 1024) {
					if (((files[i].size / 1024) / 1024) >= 1024) {
						strFileSize = (((files[i].size / 1024) / 1024) / 1024).toFixed(2) + ' GB';
					} else if ((files[i].size / 1024) >= 1024) {
						strFileSize = ((files[i].size / 1024) / 1024).toFixed(2) + ' MB';
					} else {
						strFileSize = (files[i].size / 1024).toFixed(2) + ' KB';
					}
				} else {
					strFileSize = (files[i].size).toFixed(2) + ' Byte';
				}

				strFileSize = strFileSize.replace('.00', '');

				// 전체 파일 사이즈
				_totalFileSize += fileSize;

				// 파일 배열에 넣기
				_fileList[_fileIdx] = files[i];

				// 파일 사이즈 배열에 넣기
				_fileSizeList[_fileIdx] = fileSize;

				// 업로드 파일 목록 생성
				fnRyUploaderFileList(pID, _fileIdx, fileName, strFileSize);

				// 파일 번호 증가
				_fileIdx++;
			}
		}
	} else {
		alert('error');
	}
}

// 업로드 파일 목록 생성
function fnRyUploaderFileList(pID, fIdx, fileName, fileSize) {
	let sHtml = '';

	sHtml += '<tr id="ry_fileIdx_' + fIdx + '" class="ry_row_new" data-fidx="0" data-status="1" data-rfilename="" data-filename="" data-filepath="" data-filesize="0">' + '\n';
	sHtml += '   <td class="tdL"><div class="text-ellipsis"><p>' + fileName + '</p></div></td>' + '\n';
	sHtml += '   <td class="tdR">' + fileSize + '</td>' + '\n';
	sHtml += '   <td class="tdC"><img class="ry_btnLoading" src="/resources/plugin/filedropdown/images/ajax-loader-s.gif" alt="file upload..." /><span class="ry_fileStatus">' + _arrFileStatus[0] + '</span></td>' + '\n';
	sHtml += '   <td class="tdC"><a href="#filedel" class="ry_btnFileDel" onclick="fnRyUploaderDelFile(\'' + pID + '\',' + fIdx + '); return false;">' + _fileDelBtn + '</a></td>' + '\n';
	sHtml += '</tr>' + '\n';

	$('#' + pID).find('tbody').append(sHtml);
}

// 업로드 파일 삭제
function fnRyUploaderDelFile(pID, fIdx) {
	// 전체 파일 사이즈 수정
	_totalFileSize -= _fileSizeList[fIdx];

	// 파일 배열에서 삭제
	delete _fileList[fIdx];

	// 파일 사이즈 배열 삭제
	delete _fileSizeList[fIdx];

	// 업로드 파일 테이블 목록에서 삭제
	$('#ry_fileIdx_' + fIdx).remove();
}

// 파일 등록
function fnRyUploaderUpFile(pID, pIsConf) {
	const obj = $('#' + pID);

	fnLoadingOpen();

	// 등록할 파일 리스트
	const uploadFileList = Object.keys(_fileList);

	// 파일이 있는지 체크
	//if (uploadFileList.length == 0) {
	if (obj.find('.ry_row_new').length == 0) {
		// 파일등록 경고창
		//alert('파일을 추가해 주세요.');
		fnLoadingClose();
		return false;
	}

	// 용량을 _maxUploadSize MB를 넘을 경우 업로드 불가
	if (_totalFileSize > _maxUploadSize) {
		// 파일 사이즈 초과 경고창
		alert('업로드 가능한 용량을 초과 했습니다.\n\n총 업로드 가능 용량 : ' + _maxUploadSize + ' MB');
		fnLoadingClose();
		return false;
	}

	if (pIsConf) {
		/*
			if (!confirm('업로드 하시겠습니까?')) {
				fnLoadingClose();
				return false;
			}
			*/
	}

	if (obj.find('.ry_row_new').length > 0) {
		$('#ry_file').attr('disabled', true); // input file로 인해 파일이 중복 저장 되기 때문에 처리할때는 disabled true 처리

		// 등록할 파일 리스트를 formData로 데이터 입력
		//const form = document.getElementById(_fileForm);

		//const formData = new FormData(form);
		const formData = new FormData();

		for (var i = 0; uploadFileList.length > i; i++) {
			formData.append('uploadFiles', _fileList[uploadFileList[i]]);
		}

		formData.append('utype', 'multi'); // 업로드 구분 : 멀티 업로드
		formData.append('ufolder', _fileFolder); // 업로드 폴더

		$.ajax({
			url: '/common/fileupload',
			data: formData,
			type: 'POST',
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			//contentType: 'application/json; charset=UTF-8',	        
			dataType: 'json', // dataType is json format            
			cache: false,
			async: false,
			beforeSend: function() {
				//fnLoadingOpen();
			},
			success: function(res) {
				if (res == null || res == '') {
					alert('파일 업로드중 오류가 발생했습니다.');
				} else {
					const items = res.fileDTOList
						, objNew = obj.find('.ry_row_new');
					let fileidx = rfilename = filename = filepath = filesize = ''
						, ustatus = 0
						, objThis = null;

					if (items.length > 0) {
						$.each(items, function(i, val) {
							fileidx = val.file_IDX;
							rfilename = val.real_FILE_NM;
							filename = val.file_NM;
							filepath = val.file_PATH;
							filesize = val.file_SIZE;
							ustatus = val.upload_ST;

							// 업로드 상태 업데이트
							if (objNew.length > 0) {
								objNew.each(function(j) {
									if (fileidx == (j + 1)) {
										objThis = $(this);
										objThis.attr('data-status', (ustatus == 0 ? 2 : ustatus));
										objThis.attr('data-rfilename', rfilename);
										objThis.attr('data-filename', filename);
										objThis.attr('data-filepath', filepath);
										objThis.attr('data-filesize', filesize);
										objThis.find('.ry_fileStatus').text(_arrFileStatus[ustatus]);
										objThis.removeClass('ry_row_new').addClass('ry_row_no');
										return false;
									}
								});
							}
						});

						// 업로드 완료 후 초기화
						_fileList = new Array();
						_fileSizeList = new Array();
						//$('#ry_file').val('');

						// 정상 업로드에 대한 DB 저장은 각 페이지에서 처리
						//console.log('완료');
						//fnLoadingClose();
					} else {
						alert('파일 업로드중 오류가 발생했습니다.');
					}
					//fnLoadingClose();
				}
			},
			error: function(res) {
				alert('파일 업로드중 오류가 발생했습니다.');
				//console.log(res.responseText);
				//fnLoadingClose();
			}
		});

		$('#ry_file').attr('disabled', false); // input file 다시 사용할 수 있도록 disabled false 처리
	}
	return true;
}