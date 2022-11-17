package edu.kh.project.board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Pagination;

@Repository
public class BoardDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 게시판 목록 조회 DAO
	 * @return boardTypeList
	 */
	public List<Map<String, Object>> selectBoardType() {
		return sqlSession.selectList("boardMapper.selectBoardType");
	}
 
	/** 특정 게시판 게시글 수 조회
	 * @param boardCode
	 * @return listCount
	 */
	public int getListCount(int boardCode) {
		return sqlSession.selectOne("boardMapper.getListCount", boardCode);
	}

	/** 특정 게시판 목록 조회
	 * @param pagination
	 * @param boardCode
	 * @return
	 */
	public List<Board> selectBoardList(Pagination pagination, int boardCode) {
		
//		RowBounds 객체(마이바티스)
//		 - 여러 행 조회 결과 중 특정 위치부터 지정된 행의 개수만 조회하는 객체(몇 행을 건너 뛸지)
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit(); 
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
//																	파라미터X = null
		return sqlSession.selectList("boardMapper.selectBoardList", boardCode, rowBounds);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
