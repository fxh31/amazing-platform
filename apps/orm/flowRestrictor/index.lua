-- 只有使用 redis 调用 lua 时才可以使用该参数
local key = KEYS[1]
local inerval = tonumber(ARGV[1])
local count = tonumber(ARGV[2])
local limit = tonumber(redis.call('get', key) or '0')

if limit + 1 >= count then
    return 0
else
    redis.call('incr', key) -- ++ (0,1,2,3,4,)
    redis.call('expire', key, inerval) -- 设置过期时间

    return 1
end

