/* eslint-disable prettier/prettier */
// controller, service에서 dto을 적용함 -> 클래스가 인터페이스 보다 유효함
// 프로퍼티를 여러군데서 이용하면 dto 사용하는게 용이함 (유지보수 때문에)
export class CreateBoardDto {
  title: string;
  description: string;
}
