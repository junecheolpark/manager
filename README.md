# 🏢 사내 인트라넷 리팩토링 프로젝트

## 프로젝트 개요
예전에 다뤘던 사내 인트라넷을 개인적으로 다시 정리한 프로젝트입니다.
당시 복잡하게 짜여 있던 코드를 다시 보면서 구조를 깔끔하게 정리하는 걸 목표로 진행했습니다.  
제가 맡지 않았던 부분들도 다시 파악하고 새로 구현하면서 전체 흐름을 다시 익히는 데 집중했습니다.

---

## 기술 스택
- **Backend**: Java, Spring Boot, JDBC, MyBatis (저장 프로시저 기반)
- **Frontend**: JSP, HTML, CSS, JavaScript, jQuery (Ajax)
- **Database**: PostgreSQL
- **형상관리**: Git, SVN

<img width="1865" height="1056" alt="대표이미지" src="https://github.com/user-attachments/assets/9c6ab6e3-86c7-4e55-ae6f-f2a03019ab1e" />

---

## 주요 기능
- 주간 업무 관리를 통한 업무 파악 기능
- 출퇴근 등록 기능
- fullcalender plugins을 통한 연차, 반차, 공휴일 처리 기능
- 회원 관리/ 로그인 기능
- 연차 부여 관리 기능
- 시스템에 필요한 코드 관리 기능


---

## 개발 내용
- JPA 대신 MyBatis와 저장 프로시저를 사용해서 데이터 처리
- DTO를 따로 만들지 않고 Map으로 파라미터 관리 (사내용이라 보안 이슈 없음)
- 프로시저 호출 방식으로 게시판, 근태관리 등 핵심 기능 구현
- 기능 단위로 코드 분리해서 가독성 및 유지보수성 개선
- 일정 관리에 필요한 공휴일 API 설계 구현

---

## 프로젝트 목적
- 실무 감각 유지
- 기존 시스템을 다시 파악하고 부족했던 부분 보완
- 코드 구조와 설계를 정리해서 포트폴리오로 정리

---

## DB 설계
- ERD 확인: [https://www.erdcloud.com/d/omWNTfZnd67kXw8eC](https://www.erdcloud.com/d/omWNTfZnd67kXw8eC)

---
