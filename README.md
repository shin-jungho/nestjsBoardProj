<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
---
## Method 정리 링크
### validation check github repo
1. <a href="https://github.com/typestack/class-validator#manual-validation">class-validation 정리</a>

### TypeORM docs 메소드 정리
2. <a href="https://typeorm.io/#/repository-api">TypeORM docs 메소드 정리</a> 

### Error
- EntityMetadataNotFoundError
  1. typeORM.config파일 오타 확인!
  2. entities라는 옵션을 제대로 명시했는지 확인!

- error code 
23505: 중복된 키값이 있다는 오류코드
  - 23505 오류 코드로 user.repository에서 유저 중복 가려냄

- user, board entity에서 import할 때 자동 import안되서 오류난거!
  - import 확인 항상할 것

- postman에서 signin 할 때 
  - 상위 config 폴더 안에 default.yml에서 expiresIn 값 3600이라고 적는게 아니라 "1d", "20h" 처럼 string 으로 줘야한다.<br>
  <a href="https://www.npmjs.com/package/jsonwebtoken">npm jwt 공식문서</a>

### 사용한 것들
- CLI를 사용해 Nestjs의 모듈, 컨트롤러, 서비스 생성

- passport, jwt 이용해서 토큰 인증 후 유저 정보 가져오는 것
  - JWT: 유저가 로그인 할 때 토큰을 생성
  - passport: payload 안에 유저 이름을 이용해 db안에 있는 유저 이름에 해당하는 유저 정보를 가져오는 처리를 쉽게해주는 모듈

- bcryptjs: 유저가 생성하는 비밀번로를 암호화해서 저장하게 한다.

- Guard: 허용된 유저가 아니면 요청 자체를 막는 것
  - ex) HTTP Header에 User의 정보가 담긴 Token을 보내면, 서버의 Middleware단에서 유요한 유저인지 판별하여 불필요한 자원 낭비를 막게 한다.
  - 유저에게 게시물 접근 권한을 주기 위해 `board.controller`안에 있는 모든 라우터에 `AuthGuard`를 줌

- Pipe: data transformation과 data validation을 위해서 사용
  - handler-level pipes: `@UsePipes()`을 이용해서 모든 파라미터에 적용할 수 있게 한다.
  - global Pipes: client에서 들어오는 모든 요청에 적용된다. 가장 상단 영역인 main.ts에 넣음
  - `auth.controller` 단에 signup에서 `validationPipe`을 사용해 dto에 있는 유효성 조건 체크

- log: 어디 부분이 문제인지 빠르고 정확하게 파악하기 위해 로그사용 (`board.controller`에 `getAllBoard, createBoard`에 사용)

- dto(Data Transfer Object): 인터페이스보다 클래스를 쓰고 프로퍼티를 여러군데서 이용하면 dto가 용이하므로 `create-board.dto, authCredential.dto`를 사용해 import해서 사용

- configuration: 개발 환경, 운영 환경에 따라 다르게 코드를 넣어줘야 할 때 남들에게 노출되지 않아야 하는 코드들을 설정 파일을 만들어 보관 / JSON, YAML(YML)형싱의 파일 생성 
  - ex) `default.yml, development.yml, production.yml`안에 server, db source, jwt, synchronize을 넣어 관리

- TypeORM (PostgresSQL): TS로 작성된 객체 관계형 라이브러리
### 헷갈렸던 것, 알아야될 것
- injectable 있는데 export를 쓰는 이유?
  - 우선 @Injectable()은 provider의 클래스 중 하나
  - nestjs에는 루트 모듈이 있다. 이 루트 모듈은 nest가 모듈 및 provider relationship 및 dependencies를 해결하는 데 사용하는 내부 데이터 구조를 구축하는 시발점

- `providers`: injectable 데코레이터로 인해 인스턴스화 되고, 최소 현재 모듈에서 공유될 provide의 집합
- `controllers`: 인스턴스화해야하는 현재 모듈에 정의된 controller의 집합
- `imports`: 현재 모듈에서 필요한 provider들을 export한 import된 모듈의 집합
- `exports`: 현재 모듈에 의해 제공 그리고 import하는 다른 모듈에서 사용할 수 있어야 하는 provider의 하위 집합
따라서 기본적으로 모듈은 `provider`를 캡슐화하며 현재 모듈의 `provider`에 등록되지 않고 `import`한 모듈에서 `export`하지 않은 `provider`를 inject하는 것은 불가능함.
- getMany(), getOne()
  - getMany(): 여러 개의 결과를 가져옴
  - getOne(): 하나의 결과를 가져옴