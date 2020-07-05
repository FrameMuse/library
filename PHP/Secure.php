<?php

class Secure {
    static private string $sign;
    static private string $pathname;
    static public function getMD5(string $pathname = __DIR__) : string
    {
        // Self var
        self::$sign = "";
        self::$pathname = $pathname;
        // Scour closure
        self::dirScour(function ($iterArray) : void {
            // Get full path to file
            $file = $iterArray["Fullname"];
            // Encode the file
            $fileEncoded = md5_file($file);
            // Add the content to secure sign
            self::$sign .= $fileEncoded;
        });

        return md5(self::$sign);
    }
    static private function dirScour(object $closure) : void
    {
        $RecursiveIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(self::$pathname));
        $RecursiveIterator->rewind();

        while ($RecursiveIterator->valid()) {
            if (!$RecursiveIterator->isDot() && !is_dir($RecursiveIterator->key())) {
                $closure->__invoke([
                    "Filename" => $RecursiveIterator->getSubPathName(),
                    "Pathname" => $RecursiveIterator->getSubPath(),
                    "Fullname" => $RecursiveIterator->key(),
                ]);
            }
            
            $RecursiveIterator->next();
        }
    }
}

echo Secure::getMD5(), PHP_EOL;