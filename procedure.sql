-- 事务 用来更新tf的status 以后要用计时器定时执行


BEGIN
 	DECLARE cnt INT DEFAULT 0;
    DECLARE i INT DEFAULT 0;
    DECLARE tf_id varchar(32);
    DECLARE eTime datetime;
    DECLARE now_time datetime; 
    DECLARE flag int;
    DECLARE IS_FOUND INTEGER DEFAULT 1;
	DECLARE cus CURSOR for SELECT id,end_time from task_flow where is_completed = 0;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET IS_FOUND=0;
	SELECT COUNT(*) into cnt from task_flow WHERE is_completed = 0; 
    
    open cus;
    FETCH cus into tf_id,eTime;
    WHILE i < cnt AND IS_FOUND DO
    	SELECT now() into now_time;
    	SELECT UNIX_TIMESTAMP(now_time) > UNIX_TIMESTAMP(eTime) into flag;
    	UPDATE task_flow 
    	set is_completed = 1
    	WHERE id = tf_id and flag = 1;
        
        set i = i + 1;
        FETCH cus into tf_id,eTime;
    END WHILE;
    CLOSE cus;  
END